// libraries & methods
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// ui components
import {
  Loader,
  Message,
  CheckOutSteps,
  FormContainer,
} from '../../components';
import { ShaddressReadForm, ShaddressUpdateForm } from '../../components/Forms';

// redux related
import { createShaddress } from '../../actions/userActions';
import Auth from '../../components/Auth';
import { SHADDRESS_PROPERTY_RESET, USER_INFO_UPDATE } from '../../constants';

const ShippingScreen = ({ history, location, match }) => {
  // hooks
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [addressExists, setAddressExists] = useState(false);
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const [flashMsg, setFlashMsg] = useState({
    display: false,
    variant: '',
    message: '',
  });
  const addressObj = { address, city, postalCode, country };
  // redux related
  const dispatch = useDispatch();
  const {
    loading: shaddressLoading,
    success: shaddressSuccess,
    error: shaddressError,
  } = useSelector((state) => state.shaddress);

  // variables
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const loading = shaddressLoading;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.cartItems.length === 0 && cart.cartItems.length === 0)
        history.push('/');
      if (userInfo.shippingAddress && !address) resetValues();
    }

    if (shaddressSuccess) {
      dispatch({
        type: USER_INFO_UPDATE,
        payload: {
          shippingAddress: addressObj,
        },
      });
      setEditBtnClicked(!editBtnClicked);
      msgHandler('Updated successfully', 'success');
      rxReset('success');
    }

    if (shaddressError) {
      msgHandler(shaddressError, 'danger');
      rxReset('error');
    }

    return () => axios.CancelToken.source().cancel();
  }, [userInfo, address, cart, shaddressSuccess, shaddressError]);

  const confirmHandler = () => history.push('/payment');

  const createAddressHandler = () => {
    dispatch(createShaddress(addressObj));
  };

  const resetValues = () => {
    setAddress(userInfo.shippingAddress.address);
    setCity(userInfo.shippingAddress.city);
    setPostalCode(userInfo.shippingAddress.postalCode);
    setCountry(userInfo.shippingAddress.country);
    setAddressExists(true);
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

  const editBtnHandler = () => setEditBtnClicked(!editBtnClicked);

  const cancelChanges = () => {
    resetValues();
    setEditBtnClicked(!editBtnClicked);
  };

  const functionsForReadForm = {
    onClick: editBtnHandler,
    onProceed: confirmHandler,
  };

  const functionsForUpdateForm = {
    submitHandler: createAddressHandler,
    changesHandler,
    cancelChanges,
  };

  const msgHandler = (msg, variant) => {
    setFlashMsg({ display: true, variant, message: msg });
    setTimeout(() => {
      setFlashMsg({ display: false });
    }, 3000);
  };

  const rxReset = (payload) => {
    dispatch({
      type: SHADDRESS_PROPERTY_RESET,
      payload,
    });
  };

  return (
    <Auth history={history}>
      <FormContainer>
        <CheckOutSteps step1 step2 />
        <h1>Shipping Address</h1>
        {flashMsg.display && (
          <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
        )}
        {loading ? (
          <Loader />
        ) : !editBtnClicked && userInfo && addressExists ? (
          <ShaddressReadForm
            values={addressObj}
            functions={functionsForReadForm}
            profile={false}
          />
        ) : editBtnClicked === true || !addressExists ? (
          <ShaddressUpdateForm
            values={addressObj}
            functions={functionsForUpdateForm}
            profile={false}
            addressExists={addressExists}
          />
        ) : (
          <Message variant='danger'>Something went wrong</Message>
        )}
      </FormContainer>
    </Auth>
  );
};

export default ShippingScreen;
