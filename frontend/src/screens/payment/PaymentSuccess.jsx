import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOrderDetails } from '../../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, ListGroup, Image, Container } from 'react-bootstrap'
import axios from 'axios'
import {
  Auth,
  Loader,
  Message,
  Exceptional,
  UserAddress,
} from '../../components'
import { isEmptyObj } from '../../helpers/utilities'

const PaymentSuccess = ({ history, location }) => {
  const dispatch = useDispatch()
  const id = location.search.split('=')[1]
  const { loading, order, error } = useSelector((state) => state.orderDetails)

  useEffect(() => {
    dispatch(getOrderDetails(id))
    return () => axios.CancelToken.source().cancel()
  }, [dispatch])

  const transactionInfo = [
    { label: 'Order ID', body: order?.paymentResult?.id },
    { label: 'Name', body: order?.user?.name },
    { label: 'Email', body: order?.paymentResult?.email_address },
    {
      label: 'Address',
      body: <UserAddress data={order?.user?.shippingAddress} />,
    },
    { label: 'Payment Method', body: order?.paymentMethod },
    { label: 'Payment Date', body: order?.paidAt },
  ]

  return (
    <Auth history={history}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : !isEmptyObj(order) ? (
        <Container>
          <ListGroup variant='flush'>
            {console.log(order)}
            <h2 className='mb-4 text-center'>Payment Was Successful!</h2>
            <ListGroup.Item>
              {transactionInfo.map((transaction, i) => (
                <p key={i}>
                  <strong>{transaction.label} </strong>
                  {transaction.body}
                </p>
              ))}
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <strong>Order items: </strong>
              </p>
              <ListGroup variant='flush'>
                {order.orderItems?.map((item, index) => (
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
  )
}

export default PaymentSuccess
// const id = new URLSearchParams(useLocation().search).get('id');
