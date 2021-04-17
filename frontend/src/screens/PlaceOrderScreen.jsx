import { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Card, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckOutSteps from '../components/CheckOutSteps';
import Loader from '../components/Loader';
import { getProductPrices } from '../actions/productActions';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
  // bringing redux stores
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const ids = cart.cartItems.map((item) => item._id);
  const { loading, prices, error } = useSelector(
    (state) => state.productPrices
  );

  // hooks states
  const [sdkReady, setSdkReady] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState('undefined');

  // if no cartitems, then send the user back to the home page
  if (cart.cartItems.length === 0 || !cart.shippingAddress.address) {
    history.push('/');
  }

  // -- CALCULATIONS --
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

  // -- CREATING ORDER --
  const orderCreated = useSelector((state) => state.orderReducers);

  useEffect(() => {
    // getting product prices
    dispatch(getProductPrices(ids));

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!orderCreated.success) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    } else if (orderCreated.success) {
      history.push(`/payment-success?id=${orderCreated.order._id}`);
    }
  }, [dispatch, orderCreated, history]);

  const successPaymentHandler = (paymentResult) => {
    cart.cartItems.forEach((product, index) => {
      product.price = prices[index];
    });

    const paymentInfo = {
      id: paymentResult.id,
      Status: paymentResult.status,
      update_time: paymentResult.update_time,
      email_address: paymentResult.payer.email_address,
    };

    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        paymentResult: paymentInfo,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        paidAt: paymentResult.create_time,
      })
    );
  };

  const paymentErrorHandler = (error = 'payment failed') => {
    setPaymentError(true);
    setPaymentErrorMessage(error);
  };

  return (
    <>
      {loading || orderCreated.loading ? (
        <Loader />
      ) : error || orderCreated.error ? (
        <Message variant='danger'>
          {error || (
            <>
              <h2 className='danger-text'>Payment Failed!</h2>
              <p>Error: {orderCreated.error || paymentErrorMessage}</p>
              {orderCreated.error && (
                <p className='mt-10'>
                  This seems like a server error so please contact us at{' '}
                  <a href='mailto:support@proshop.com'>support@proshop.com</a>{' '}
                  with screenshot
                </p>
              )}
            </>
          )}
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
                    <strong>Name: </strong>
                    {userInfo.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {userInfo.email}
                  </p>

                  <p>
                    <strong>Address: </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                    {cart.shippingAddress.postalCode},{' '}
                    {cart.shippingAddress.country}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
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
                    {!orderCreated.isPaid && (
                      <ListGroup.Item>
                        {orderCreated.loading || !sdkReady ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            amount={cart.totalPrice}
                            onSuccess={successPaymentHandler}
                            onError={paymentErrorHandler}
                          />
                        )}
                      </ListGroup.Item>
                    )}
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
