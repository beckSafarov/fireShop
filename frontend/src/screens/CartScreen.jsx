// -- METHODS & LIBRARIES
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Auth from '../helpers/auth';
import Calculations from '../helpers/calculations';

// -- UI COMPONENTS
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CartItem from '../components/CartItem';

// -- REDUX RELATED IMPORTS --
import { getAllCartItems, removeItem } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const [visibility, setVisibility] = useState(false);
  const [alertMessage, setMessage] = useState('');

  //redux related
  const dispatch = useDispatch();
  const allCartItems = useSelector((state) => state.cart);
  const { loading: cartItemsLoading, success, error } = allCartItems;

  // variables
  const auth = Auth();
  const cartItems = auth.userInfo ? auth.userInfo.cartItems : [];
  const calcs = Calculations(cartItems);
  let loading = cartItemsLoading || auth.loading;

  //getting all cart items
  useEffect(() => {
    if (auth.logged === false) {
      history.push('/signin?redirect=cart');
    } else if (auth.logged) dispatch(getAllCartItems());

    return () => axios.CancelToken.source().cancel();
  }, [auth.logged, dispatch]);

  const removeFromCart = async (id, name) => {
    dispatch(removeItem(id));
    if (success) {
      setMessage(`${name} has been removed from your cart`);
      setVisibility(true);
      setTimeout(() => {
        setVisibility(false);
      }, 2000);
    }
  };

  const checkoutHandler = () => {
    history.push('/signin?from=cart&redirect=shipping');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : success ? (
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {visibility && <Message variant='success'>{alertMessage}</Message>}
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty <Link to='/'>Go back</Link>
              </Message>
            ) : (
              <ListGroup variant='flush'>
                {cartItems.map((item, index) => (
                  <CartItem
                    key={index}
                    item={item}
                    dispatch={dispatch}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            {calcs.subtotal !== 0 && (
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Subtotal: {calcs.subtotal} item(s)</h4>
                    <h4>Total price: ${calcs.totalPrice} </h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-block'
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            )}
          </Col>
        </Row>
      ) : (
        <p>you should never see this</p>
      )}
    </>
  );
};

export default CartScreen;
