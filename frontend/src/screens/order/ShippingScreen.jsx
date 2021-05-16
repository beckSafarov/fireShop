import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import CheckOutSteps from '../../components/CheckOutSteps';
import { createShaddress } from '../../actions/userActions';
import { ShaddressReadForm, ShaddressUpdateForm } from '../../components/Forms';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import store from '../../store';

const ShippingScreen = ({ history, location, match }) => {
  // hooks
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [addressExists, setAddressExists] = useState(false);
  const [editBtnClicked, setEditBtnClicked] = useState(false);

  // bringing redux stores
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const shaddress = useSelector((state) => state.shaddress);
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;
  const userLogged = userInfo ? true : false;
  const userNotLogged =
    userLogin.loading === false && userInfo === undefined ? true : false;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userNotLogged || (cart.success && cartItems.length === 0))
      history.push('/');

    if (userLogged && userInfo.shippingAddress) resetValues();

    store.subscribe(() => {
      if (store.getState().shaddress.success) {
        window.location.reload();
      }
    });
  }, [cartItems, userLogin, history, editBtnClicked]);

  const confirmHandler = () => {
    history.push('/payment');
  };

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
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping Address</h1>
      {userLogin.loading || shaddress.loading ? (
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
  );
};

export default ShippingScreen;
