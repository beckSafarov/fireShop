import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CartItem from '../components/CartItem';
import { getProductPrices } from '../actions/productActions';
import { removeItem } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [alertMessage, setMessage] = useState('');

  //getting current cartItems from redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const ids = cartItems.map((item) => item._id);

  //getting current cart item prices from redux store
  const pricesFromStore = useSelector((state) => state.productPrices);
  const { loading, prices, error } = pricesFromStore;

  //getting cart item prices
  useEffect(() => {
    if (ids.length > 0) {
      dispatch(getProductPrices(ids));
    }
  }, [dispatch]);

  const removeFromCart = (id, name) => {
    dispatch(removeItem(id));
    setMessage(`${name} has been removed from your cart`);
    setVisibility(true);
    setTimeout(() => {
      setVisibility(false);
    }, 2000);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, current) => (total += current.qty), 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    if (prices.length > 0) {
      cartItems.forEach((product, index) => {
        total += product.qty * prices[index];
      });
      total = total.toFixed(2);
    }
    return total;
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
      ) : (
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
                    index={index}
                    prices={prices}
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
      )}
    </>
  );
};

export default CartScreen;
