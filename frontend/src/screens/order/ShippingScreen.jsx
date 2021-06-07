// libraries & methods
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// ui components
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import CheckOutSteps from '../../components/CheckOutSteps';
import { ShaddressReadForm, ShaddressUpdateForm } from '../../components/Forms';
import FormContainer from '../../components/FormContainer';

// redux related
import store from '../../store';
import { createShaddress } from '../../actions/userActions';
import Auth from '../../components/Auth';

const ShippingScreen = ({ history, location, match }) => {
  // hooks
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [addressExists, setAddressExists] = useState(false);
  const [editBtnClicked, setEditBtnClicked] = useState(false);

  // redux related
  const dispatch = useDispatch();
  const shaddress = useSelector((state) => state.shaddress);

  // variables
  const { userInfo } = useSelector((state) => state.userLogin);
  let loading = shaddress.loading;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.cartItems.length === 0) history.push('/');
      if (userInfo.shippingAddress && address === '') resetValues();
    }

    const unsubscribe = store.subscribe(() => {
      if (store.getState().shaddress.success) {
        window.location.reload();
      }
    });

    return () => {
      axios.CancelToken.source().cancel();
      unsubscribe();
    };
  }, [userInfo, history, address]);

  const confirmHandler = () => history.push('/payment');

  const createAddressHandler = () => {
    dispatch(
      createShaddress({
        address,
        city,
        postalCode,
        country,
      })
    );
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

  const values = {
    address,
    city,
    postalCode,
    country,
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

  return (
    <Auth history={history}>
      <FormContainer>
        <CheckOutSteps step1 step2 />
        <h1>Shipping Address</h1>
        {loading ? (
          <Loader />
        ) : shaddress.error ? (
          <Message variant='danger'>{shaddress.error}</Message>
        ) : !editBtnClicked && userInfo && addressExists ? (
          <ShaddressReadForm
            values={values}
            functions={functionsForReadForm}
            profile={false}
          />
        ) : editBtnClicked === true || !addressExists ? (
          <ShaddressUpdateForm
            values={values}
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
