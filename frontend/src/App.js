import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import PaymentSuccess from './screens/PaymentSuccess';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
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
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
