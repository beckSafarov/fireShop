// libraries & methods
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../helpers/auth';
import CartChecker from '../../helpers/cartChecker';

// ui components
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import CheckOutSteps from '../../components/CheckOutSteps';
import { ShaddressReadForm, ShaddressUpdateForm } from '../../components/Forms';
import FormContainer from '../../components/FormContainer';

// redux related
import store from '../../store';
import { createShaddress } from '../../actions/userActions';

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
  const auth = Auth();
  const cartCheck = CartChecker();
  const userInfo = auth.userInfo;
  let loading = shaddress.loading || auth.loading || cartCheck.loading;

  useEffect(() => {
    if (auth.logged === false || cartCheck.haveItems === false)
      history.push('/');

    if (auth.logged && userInfo.shippingAddress && address === '')
      resetValues();

    const unsubscribe = store.subscribe(() => {
      if (store.getState().shaddress.success) {
        window.location.reload();
      }
    });

    return () => unsubscribe();
  }, [auth, cartCheck.haveItems, history]);

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
        console.log(address);
        break;
      case 'city':
        setCity(event.target.value);
        console.log(city);
        break;
      case 'postalCode':
        setPostalCode(event.target.value);
        console.log(postalCode);
        break;
      case 'country':
        setCountry(event.target.value);
        console.log(country);
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
  );
};

export default ShippingScreen;
