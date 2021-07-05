// libraries
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// methods
import { Calculations } from '../../helpers/calculations.js';
import Auth from '../../components/Auth';

// UI components
import Message from '../../components/Message';
import CheckOutSteps from '../../components/CheckOutSteps';
import Loader from '../../components/Loader';
import ListRow from '../../components/ListRow';
import { Row, Col, ListGroup, Card, Image } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';

// redux actions
import { createOrder } from '../../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
  // bringing redux related things
  const dispatch = useDispatch();
  const orderCreated = useSelector((state) => state.orderReducers);

  // variables
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const calcs = Calculations(cartItems);
  const loading = orderCreated.loading;
  const error = orderCreated.error;

  // hooks states
  const [sdkReady, setSdkReady] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState('undefined');

  useEffect(
    () => {
      if (userInfo && !userInfo.shippingAddress) {
        history.push('/');
      }

      const addPaypalScript = async () => {
        try {
          const { data: clientId } = await axios.get('/api/config/paypal', {
            cancelToken: axios.CancelToken.source().token,
          });
          console.log('building paypal');
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
          script.onload = () => setSdkReady(true);
          document.body.appendChild(script);
        } catch (err) {
          console.log(`Error happened while axios request: ${err.message}`);
        }
      };

      if (userInfo && !orderCreated.success) {
        !window.paypal ? addPaypalScript() : setSdkReady(true);
      } else if (orderCreated.success) {
        history.push(`/payment-success?id=${orderCreated.order._id}`);
      }

      return () => axios.CancelToken.source().cancel();
    },
    [userInfo, dispatch, orderCreated.success],
    history
  );

  const successPaymentHandler = (paymentResult) => {
    const paymentInfo = {
      id: paymentResult.id,
      Status: paymentResult.status,
      update_time: paymentResult.update_time,
      email_address: paymentResult.payer.email_address,
    };

    dispatch(
      createOrder({
        paymentMethod: 'Paypal',
        paymentResult: paymentInfo,
        taxPrice: calcs.taxPrice,
        shippingPrice: calcs.shippingPrice,
        totalPrice: calcs.totalPrice,
        paidAt: paymentResult.create_time,
      })
    );
  };

  const paymentErrorHandler = (error = 'payment failed') => {
    setPaymentError(true);
    setPaymentErrorMessage(error);
  };

  // listrow values
  const labels = ['Items price', 'Shipping', 'Tax', 'Total'];

  return (
    <Auth history={history}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
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
        </Message>
      ) : userInfo ? (
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
                    {userInfo.shippingAddress.address},{' '}
                    {userInfo.shippingAddress.city},{' '}
                    {userInfo.shippingAddress.postalCode},{' '}
                    {userInfo.shippingAddress.country}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    <strong>Payment Method: </strong>
                    {'Paypal'}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <p>
                    <strong>Order items: </strong>
                  </p>
                  <ListGroup variant='flush'>
                    {cartItems.map((item, index) => (
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
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price} = ${item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <h2 className='mb-4 text-center'>Order Summary</h2>
              <Card>
                <ListGroup variant='flush'>
                  {[...Array(4).keys()].map((loopNum, index) => (
                    <ListGroup.Item key={index}>
                      <ListRow
                        label={labels[index]}
                        value={Object.values(calcs)[index]}
                        sign={index === 3 ? '=' : '+'}
                      />
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    {!orderCreated.isPaid && (
                      <ListGroup.Item>
                        {orderCreated.loading || !sdkReady ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            id='paypalButton'
                            amount={calcs.totalPrice}
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
    </Auth>
  );
};

export default PlaceOrderScreen;
