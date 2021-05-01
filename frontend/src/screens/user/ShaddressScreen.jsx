// -- LIBRARIES --
import { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// -- COMPONENTS --
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { ShaddressReadForm, ShaddressUpdateForm } from '../../components/Forms';
import { LinkContainer } from 'react-router-bootstrap';
import AccountSideMenu from '../../components/AccountSideMenu';

// -- REDUX RELATED IMPORTS --
import { createShaddress, getMe } from '../../actions/userActions';
import { USER_INFO_UPDATE } from '../../constants';
import store from '../../store';

const ShaddressScreen = ({ history }) => {
  //hooks
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState(null);
  const [msgVariant, setmsgVariant] = useState('danger');
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const [valuesAssigned, setValuesAssigned] = useState(false);

  // Redux stores
  const dispatch = useDispatch();
  const shaddress = useSelector((state) => state.shaddress);
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;
  const userLogged = userInfo ? true : false;
  const userNotLogged =
    userLogin.loading === false && userInfo === undefined ? true : false;

  useEffect(() => {
    if (userLogged) {
      resetValues();
    } else if (userNotLogged) history.push('/');

    if (shaddress.success) resetValues();

    store.subscribe(() => {
      if (store.getState().shaddress.success) {
        setMessageHandler('Updated successfully', 'success');
      }
    });
    const cancelTokenSource = axios.CancelToken.source();
    return () => cancelTokenSource.cancel();
  }, [userLogin, shaddress, store]);

  const setMessageHandler = (msg, variant) => {
    setMessage(msg);
    setmsgVariant(variant);
    setTimeout(function () {
      setMessage(null);
    }, 3000);
  };

  const resetValues = () => {
    if (userInfo.shippingAddress && !shaddress.success) {
      // console.log('assigning the REAL values');
      setAddress(userInfo.shippingAddress.address);
      setCity(userInfo.shippingAddress.city);
      setPostalCode(userInfo.shippingAddress.postalCode);
      setCountry(userInfo.shippingAddress.country);
    } else if (shaddress.success) {
      setAddress(shaddress.data.address);
      setCity(shaddress.data.city);
      setPostalCode(shaddress.data.postalCode);
      setCountry(shaddress.data.country);
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
    await dispatch(createShaddress({ address, city, postalCode, country }));
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
    <Row>
      {userInfo && (
        <>
          {shaddress.loading || !valuesAssigned ? (
            <Loader />
          ) : shaddress.error ? (
            <Message variant='danger'>{shaddress.error}</Message>
          ) : (
            <>
              <Col md={2} sm={2}>
                <AccountSideMenu active={2} />
              </Col>
              <Col md={10} sm={10}>
                <h3 className='mb-4'>Shipping Address</h3>
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
  );
};

export default ShaddressScreen;
