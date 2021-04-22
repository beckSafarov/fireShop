import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CartItem from '../components/CartItem';
import { getAllCartItems, removeItem } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [alertMessage, setMessage] = useState('');

  //redux stores
  const allCartItems = useSelector((state) => state.cart); //loading, success, cartItems, error
  const { loading, success, cartItems, error } = allCartItems;
  const { userInfo } = useSelector((state) => state.userLogin);

  //getting all cart items
  useEffect(() => {
    if (!userInfo) {
      history.push('/signin?redirect=cart');
    } else {
      dispatch(getAllCartItems());
    }
  }, [dispatch]);

  const removeFromCart = async (id, name) => {
    await dispatch(removeItem(id));
    if (success) {
      setMessage(`${name} has been removed from your cart`);
      setVisibility(true);
      setTimeout(() => {
        setVisibility(false);
      }, 2000);
    }
  };

  // overall number of products in the cart
  const getSubtotal = () => {
    return cartItems.reduce((total, current) => (total += current.qty), 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, product) => (total += product.qty * product.price),
      0
    );
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
            {getSubtotal() !== 0 && (
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Subtotal: {getSubtotal()} item(s)</h4>
                    <h4>Total price: ${getTotalPrice()} </h4>
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
