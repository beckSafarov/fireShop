import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Card, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckOutSteps from '../components/CheckOutSteps';
import Loader from '../components/Loader';
import { getProductPrices } from '../actions/productActions';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const ids = cart.cartItems.map((item) => item._id);
  const { loading, prices, error } = useSelector(
    (state) => state.productPrices
  );
  if (cart.cartItems.length === 0 || !cart.shippingAddress.address) {
    history.push('/');
  }

  useEffect(() => {
    dispatch(getProductPrices(ids));
  }, [dispatch]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    console.log('you placed the order');
  };

  // Calculate Stuff
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const getProductsPrice = () => {
    let total = 0;
    if (prices.length > 0) {
      cart.cartItems.forEach((item, index) => {
        total += item.qty * prices[index];
      });
      total = addDecimals(Number(total));
    }
    return total;
  };

  cart.shippingPrice = addDecimals(
    getProductsPrice() > 0 ? (getProductsPrice() > 1000 ? 15 : 10) : 10
  );

  cart.taxPrice = getProductsPrice
    ? addDecimals((getProductsPrice() * 0.05).toFixed(2))
    : 10;

  cart.totalPrice = addDecimals(
    Number(getProductsPrice()) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          Sorry something went wrong while fetching prices
        </Message>
      ) : prices ? (
        <>
          <CheckOutSteps step1 step2 step3 step4 />
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <h2 className='mb-4 text-center'>Order Details</h2>
                <ListGroup.Item>
                  <p>
                    <strong>Address: </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                    {cart.shippingAddress.postalCode},{' '}
                    {cart.shippingAddress.country}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p className>
                    <strong>Payment Method: </strong>
                    {cart.paymentMethod}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <p>
                    <strong>Order items: </strong>
                  </p>
                  {cart.cartItems.length === 0 ? (
                    <Message>You cart is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {cart.cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                className='img-fluid img-rounded'
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item._id}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x {prices[index]} = $
                              {item.qty * prices[index]}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <h2 className='mb-4 text-center'>Order Summary</h2>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items Price</Col>
                      <Col>+ ${getProductsPrice()}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>+ ${cart.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>+ ${cart.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>= ${cart.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-block'
                      variant='primary'
                      disabled={cart.cartItems.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <p>You should never see this!</p>
      )}
    </>
  );
};

export default PlaceOrderScreen;