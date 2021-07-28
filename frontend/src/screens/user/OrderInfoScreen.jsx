// methods
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// methods
import { Calculations } from '../../helpers/Calculations'

// UI components
import { Row, Col, ListGroup, Image, Container, Button } from 'react-bootstrap'
import {
  Auth,
  Message,
  Loader,
  DeliveryProgress,
  UpdateDeliveryModal,
  Spinner,
} from '../../components'

//Redux actions
import { getOrderDetails } from '../../actions/orderActions'
import {
  ORDERS_LIST_PROPERTY_RESET as listReset,
  ORDER_UPDATE_RESET as detailsReset,
} from '../../constants'

const deliverySteps = {
  Received: 1,
  Packed: 2,
  Shipped: 3,
  Delivered: 4,
}

const OrderInfoScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  // redux stores
  const { loading, order, error, success, type } = useSelector(
    (state) => state.orderDetails
  )
  const calcs = Calculations(order.orderItems || [])
  const { userInfo } = useSelector((state) => state.userLogin)

  // hooks
  const [modal, setModal] = useState({})
  const [flashMsg, setFlashMsg] = useState({})

  // variables
  const requestLoading = loading && type === 'request'

  useEffect(() => {
    order._id !== match.params.id && dispatch(getOrderDetails(match.params.id))

    if (success && type === 'update') {
      setMsgHandler('Updated successfully')
      setModal({ ...modal, display: false })
      dispatch({ type: detailsReset, payload: 'success' })
      dispatch({ type: listReset, payload: 'success' })
    }

    return () => axios.CancelToken.source().cancel()
  }, [dispatch, match, success, type])

  const UTCDate = (d) => {
    const date = new Date(d)
    return date.toUTCString()
  }

  const setMsgHandler = (message, variant = 'success') => {
    setFlashMsg({ display: true, message, variant })
    setTimeout(() => setFlashMsg({}), 3000)
  }

  const updateHandler = () => {
    setModal({
      display: true,
      _id: order._id,
      deliveryStatus: order.deliveryStatus,
    })
  }

  return (
    <Auth history={history}>
      <Container>
        {flashMsg.display && (
          <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
        )}
        {requestLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : order.user ? (
          <Row>
            {modal.display && (
              <UpdateDeliveryModal modal={modal} setModal={setModal} />
            )}
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
              <div className='delivery-progress-container'>
                <DeliveryProgress
                  width={500}
                  height={100}
                  progress={deliverySteps[order.deliveryStatus]}
                />
              </div>
              <ListGroup variant='flush'>
                {order.isDelivered ? (
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col>Delivered</Col>
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
                        <Col>Delivery Date</Col>
                        <Col>{UTCDate(order.deliveredAt)}</Col>
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
                        <Col>Expected Delivery Date</Col>
                        <Col>some day</Col>
                      </Row>
                    </ListGroup.Item>
                  </>
                )}
                {userInfo.isAdmin && (
                  <ListGroup.Item>
                    <Button
                      title='Update Delivery Status'
                      variant='info'
                      size='sm'
                      onClick={updateHandler}
                      block
                    >
                      <i className='fas fa-edit'></i>
                    </Button>
                  </ListGroup.Item>
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
  )
}

export default OrderInfoScreen
