// Methods
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI components
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Loader from './components/Loader';
import Message from './components/Message';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/order/ShippingScreen';
import PaymentScreen from './screens/payment/PaymentScreen';
import PlaceOrderScreen from './screens/order/PlaceOrderScreen';
import PaymentSuccess from './screens/payment/PaymentSuccess';
import PaymentFailure from './screens/payment/PaymentFailure';

//redux actions
import { getMe } from './actions/userActions';

const App = () => {
  const dispatch = useDispatch();
  const { loading, success, userInfo, error } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (!userInfo) dispatch(getMe());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <main className='py-3'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Container>
            <Message variant='danger'>{error}</Message>
          </Container>
        ) : (
          <Container id='container'>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/signin/' component={LoginScreen} />
            <Route path='/register/' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen}></Route>
            <Route path='/shipping' component={ShippingScreen}></Route>
            <Route path='/payment' component={PaymentScreen}></Route>
            <Route path='/placeorder' component={PlaceOrderScreen}></Route>
            <Route path='/payment-success' component={PaymentSuccess}></Route>
            <Route path='/payment-failure' component={PaymentFailure}></Route>
          </Container>
        )}
      </main>
      <Footer />
    </Router>
  );
};

export default App;
