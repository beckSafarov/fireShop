import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getOrderDetails } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card, Image, Container } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import axios from 'axios';
import Auth from '../../components/Auth';
import Exceptional from '../../components/Exceptional';

const PaymentSuccess = ({ history, location }) => {
  const dispatch = useDispatch();
  const id = location.search.split('=')[1];
  const { loading, order, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(id));
    return () => axios.CancelToken.source().cancel();
  }, [order.length, dispatch]);

  return (
    <Auth history={history}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : order ? (
        <Container>
          <ListGroup variant='flush'>
            {console.log(order)}
            <h2 className='mb-4 text-center'>Payment Was Successful!</h2>
            <ListGroup.Item>
              <p>
                <strong>Order ID: </strong>
                {order.paymentResult.id}
              </p>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.paymentResult.email_address}
              </p>

              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>
              <p>
                <strong>Payment Date: </strong>
                {order.paidAt}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <strong>Order items: </strong>
              </p>
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
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
            <ListGroup.Item>
              <p>
                <strong>Total Paid: </strong>
                {order.totalPrice}
              </p>
            </ListGroup.Item>
          </ListGroup>
          <div className='mt-4'>
            <p>
              Your order should be delivered within 2 weeks. You can track the
              progress in your <strong>Profile</strong>,{' '}
              <strong>My Orders</strong> Section
            </p>
          </div>
        </Container>
      ) : (
        <Exceptional />
      )}
    </Auth>
  );
};

export default PaymentSuccess;
// const id = new URLSearchParams(useLocation().search).get('id');
