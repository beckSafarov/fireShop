// methods
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// UI components
import {
  Button,
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  Container,
} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

//Redux actions
import { getOrderDetails } from '../../actions/orderActions';

const OrderInfoScreen = ({ match, history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const orderInfo = useSelector((state) => state.orderDetails);
  const { order } = orderInfo;
  const orderInfoExists = orderInfo ? true : false;

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderInfo.order._id !== match.params.id)
      dispatch(getOrderDetails(match.params.id));
  }, [dispatch, match, orderInfo]);

  return (
    <Container>
      {orderInfo.loading ? (
        <Loader />
      ) : orderInfo.error ? (
        <Message variant='danger'>{orderInfo.error}</Message>
      ) : orderInfo.order ? (
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <p>
              <strong>Name: </strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              {order.user.email}
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
          </ListGroup.Item>
          <ListGroup.Item>
            {order.orderItems.map((item, index) => (
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
            ))}
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <p>Don't read this!</p>
      )}
    </Container>
  );
};

export default OrderInfoScreen;
