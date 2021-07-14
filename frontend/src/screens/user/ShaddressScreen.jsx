// -- LIBRARIES/METHODS --
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// -- COMPONENTS --
import { ShaddressReadForm, ShaddressUpdateForm } from '../../components/Forms';
import { Auth, Message, Loader, AccountSideMenu } from '../../components';

// -- REDUX RELATED IMPORTS --
import { updateUserProfile } from '../../actions/userActions';
import { USER_DETAILS_PROPERTY_RESET } from '../../constants';
import { USER_INFO_UPDATE } from '../../constants';

const ShaddressScreen = ({ history }) => {
  //hooks
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const [valuesAssigned, setValuesAssigned] = useState(false);
  const [flashMsg, setFlashMsg] = useState({});
  const addressObj = { address, city, postalCode, country };

  // Redux stores
  const dispatch = useDispatch();

  // variables
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.userDetailsUpdate);
  let loading = updateLoading || !valuesAssigned;

  useEffect(() => {
    userInfo && resetValues();
    if (updateSuccess) {
      dispatch({
        type: USER_INFO_UPDATE,
        payload: { shippingAddress: addressObj },
      });
      setEditBtnClicked(false);
      setMsgHandler('Updated successfully', 'success');
      rxReset('success');
      updateFormValues();
    }

    if (updateError) {
      setMsgHandler(updateError, 'danger');
      rxReset('error');
    }

    return () => axios.CancelToken.source().cancel();
  }, [userInfo, updateSuccess, updateError]);

  const setMsgHandler = (msg, variant) => {
    setFlashMsg({ display: true, variant, message: msg });
    setTimeout(() => {
      setFlashMsg({ display: false });
    }, 3000);
  };

  const resetValues = () => {
    if (userInfo.shippingAddress) {
      setAddress(userInfo.shippingAddress.address);
      setCity(userInfo.shippingAddress.city);
      setPostalCode(userInfo.shippingAddress.postalCode);
      setCountry(userInfo.shippingAddress.country);
    }
    setValuesAssigned(true);
  };

  const updateFormValues = () => {
    setAddress(address);
    setCity(city);
    setPostalCode(postalCode);
    setCountry(country);
  };

  const editBtnHandler = () => {
    setEditBtnClicked(!editBtnClicked);
    if (editBtnClicked) setValuesAssigned(false);
  };

  const updateShaddressHandler = async (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        shippingAddress: { address, city, postalCode, country },
      })
    );
  };

  const changesHandler = (event) => {
    event.persist();
    switch (event.target.name) {
      case 'address':
        setAddress(event.target.value);
        break;
      case 'city':
        setCity(event.target.value);
        break;
      case 'postalCode':
        setPostalCode(event.target.value);
        break;
      case 'country':
        setCountry(event.target.value);
        break;
    }
  };

  const cancelChanges = () => {
    resetValues();
    setEditBtnClicked(false);
  };

  const rxReset = (payload) => {
    dispatch({
      type: USER_DETAILS_PROPERTY_RESET,
      payload,
    });
  };

  // functions to pass to form components
  const funcsToEditForm = {
    submitHandler: updateShaddressHandler,
    changesHandler,
    cancelChanges,
  };

  return (
    <Auth history={history}>
      <Row>
        {userInfo && (
          <>
            {loading ? (
              <Loader />
            ) : (
              <>
                <Col md={2} sm={2}>
                  <AccountSideMenu active={2} />
                </Col>
                <Col md={10} sm={10}>
                  <h3 className='mb-4'>Address</h3>
                  {flashMsg.display && (
                    <Message variant={flashMsg.variant}>
                      {flashMsg.message}
                    </Message>
                  )}
                  {!editBtnClicked ? (
                    <ShaddressReadForm
                      values={addressObj}
                      functions={{ onClick: editBtnHandler }}
                    />
                  ) : (
                    <ShaddressUpdateForm
                      values={addressObj}
                      functions={funcsToEditForm}
                    />
                  )}
                </Col>
              </>
            )}
          </>
        )}
      </Row>
    </Auth>
  );
};

export default ShaddressScreen;
