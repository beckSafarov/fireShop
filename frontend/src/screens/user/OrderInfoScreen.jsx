// methods
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// methods
import { Calculations } from '../../helpers/Calculations';

// UI components
import { Row, Col, ListGroup, Image, Container } from 'react-bootstrap';
import { Auth, Message, Loader } from '../../components';

//Redux actions
import { getOrderDetails } from '../../actions/orderActions';

const OrderInfoScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const { loading, order, error } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const calcs = Calculations(order.orderItems || []);

  useEffect(() => {
    if (userInfo) dispatch(getOrderDetails(match.params.id));

    return () => axios.CancelToken.source().cancel();
  }, [dispatch, match, userInfo]);

  return (
    <Auth history={history}>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : order ? (
          <Row>
            <Col md={6}>
              <>
                <h3 className='mb-4'>Order Info</h3>
                <ListGroup variant='flush'>
                  {/* info about the order */}
                  <ListGroup.Item key={1}>
                    <p>
                      <strong>Order ID: </strong>
                      {order._id}
                    </p>
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
                      {order.shippingAddress.address},{' '}
                      {order.shippingAddress.city},{' '}
                      {order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress.country}
                    </p>
                    <p>
                      <strong>Payment Method: </strong>
                      {order.paymentMethod}
                    </p>
                  </ListGroup.Item>
                  {/* list of bought items */}
                  <ListGroup.Item key={2}>
                    <p>Purchased Product(s)</p>
                    {order.orderItems.map((item, index) => (
                      <Row key={item._id}>
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
                  {/* order calculations */}
                  <ListGroup.Item key={3}>
                    <Row>
                      <Col> Cumulative Products' Price </Col>
                      <Col>+ {calcs.productsPrice}</Col>
                    </Row>
                    <Row>
                      <Col> Shipping </Col>
                      <Col>+ {order.shippingPrice}</Col>
                    </Row>
                    <Row>
                      <Col> Tax </Col>
                      <Col>+ {order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {' '}
                        <h5>Total</h5>{' '}
                      </Col>
                      <Col>
                        <h5>{order.totalPrice}</h5>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </>
            </Col>
            <Col md={6}>
              <h3 className='mb-4'>Order Status</h3>
              <ListGroup variant='flush'>
                {order.isDelivered ? (
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col>Delievered</Col>
                        <Col>
                          <i
                            style={{ color: 'green' }}
                            className='fas fa-check'
                          ></i>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Delivered Date</Col>
                        <Col>some day</Col>
                      </Row>
                    </ListGroup.Item>
                  </>
                ) : (
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col>Delievered</Col>
                        <Col>
                          <i
                            style={{ color: 'red' }}
                            className='fas fa-times'
                          ></i>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Delivery Progress</Col>
                        <Col>Packed, on the way</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Expected Delivery Date</Col>
                        <Col>some day</Col>
                      </Row>
                    </ListGroup.Item>
                  </>
                )}
              </ListGroup>
            </Col>
          </Row>
        ) : (
          <Message variant='danger'>
            Sorry something went wrong. Try again later!
          </Message>
        )}
      </Container>
    </Auth>
  );
};

export default OrderInfoScreen;
