// -- LIBRARIES/METHODS --
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Auth from '../../components/Auth';

// -- COMPONENTS --
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { ShaddressReadForm, ShaddressUpdateForm } from '../../components/Forms';
import AccountSideMenu from '../../components/AccountSideMenu';

// -- REDUX RELATED IMPORTS --
import { updateUserProfile } from '../../actions/userActions';
import store from '../../store';

const ShaddressScreen = ({ history }) => {
  //hooks
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [country, setCountry] = useState(null);
  const [message, setMessage] = useState(null);
  const [msgVariant, setmsgVariant] = useState('danger');
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const [valuesAssigned, setValuesAssigned] = useState(false);

  // Redux stores
  const dispatch = useDispatch();

  // variables
  const { userInfo } = useSelector((state) => state.userLogin);
  const addressUpdate = useSelector((state) => state.userDetailsUpdate);
  let loading = addressUpdate.loading || !valuesAssigned;

  useEffect(() => {
    if (userInfo) resetValues();

    const unsubscribe = store.subscribe(() => {
      let update = store.getState().userDetailsUpdate;
      if (update.success) {
        setMsgHandler('Updated successfully', 'success');
      } else if (update.error) {
        setMsgHandler(update.error, 'danger');
      }
    });

    return () => {
      axios.CancelToken.source().cancel();
      unsubscribe();
    };
  }, [addressUpdate.success]);

  const setMsgHandler = (msg, variant) => {
    setMessage(msg);
    setmsgVariant(variant);
    setTimeout(function () {
      setMessage(null);
    }, 3000);
  };

  const resetValues = () => {
    if (userInfo.shippingAddress) {
      setAddress(userInfo.shippingAddress.address);
      setCity(userInfo.shippingAddress.city);
      setPostalCode(userInfo.shippingAddress.postalCode);
      setCountry(userInfo.shippingAddress.country);
    } else {
      setAddress('');
      setCity('');
      setPostalCode('');
      setCountry('');
    }
    setValuesAssigned(true);
  };

  const editBtnHandler = () => {
    setEditBtnClicked(!editBtnClicked);
    if (editBtnClicked) setValuesAssigned(false);
  };

  const updateShaddressHandler = async () => {
    dispatch(
      updateUserProfile({
        shippingAddress: { address, city, postalCode, country },
      })
    );
    setEditBtnClicked(false);
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

  // -- VALUE & FUNCTION OBJECTS TO PASS TO COMPONENTS
  const values = {
    address,
    city,
    postalCode,
    country,
  };

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
                  {message !== null && (
                    <Message variant={msgVariant}>{message}</Message>
                  )}
                  {!editBtnClicked ? (
                    <ShaddressReadForm
                      values={values}
                      functions={{ onClick: editBtnHandler }}
                    />
                  ) : (
                    <ShaddressUpdateForm
                      values={values}
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
