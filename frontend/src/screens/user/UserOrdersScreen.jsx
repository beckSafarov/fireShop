// Methods
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// UI components
import { Message, Loader, Auth } from '../../components'
import { Table, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// Redux related imports
import { getMyOrders } from '../../actions/orderActions'

const UserOrdersScreen = ({ history }) => {
  // -- redux stores --
  const dispatch = useDispatch()
  const { loading, orders, error } = useSelector((state) => state.myOrders)

  useEffect(() => {
    if (orders && orders.length === 0) dispatch(getMyOrders())
    return () => axios.CancelToken.source().cancel()
  }, [dispatch, orders])

  const LocaleDate = (d) => {
    const date = new Date(d)
    return date.toLocaleDateString()
  }

  return (
    <Auth history={history}>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : orders === null ? (
          <h3>You have no orders yet</h3>
        ) : (
          <>
            <h3 className='mb-5'>Your orders</h3>
            <Table
              striped
              bordered
              hover
              responsive
              className='table-sm'
              style={{ textAlign: 'center' }}
            >
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>DATE</th>
                  <th>PAID</th>
                  <th>DELIVERY STATUS</th>
                  <th>DELIVERY DATE</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button variant='link'>{order._id}</Button>
                      </LinkContainer>
                    </td>
                    <td>
                      {order.paidAt
                        ? order.paidAt.substring(0, 10)
                        : 'undefined'}
                    </td>
                    <td>{order.totalPrice}</td>
                    <td>
                      <p
                        style={{
                          color: order.isDelivered ? 'green' : '#636669',
                        }}
                      >
                        {order.deliveryStatus}
                      </p>
                    </td>
                    <td>
                      {order.deliveredAt ? (
                        <p>{LocaleDate(order.deliveredAt)}</p>
                      ) : (
                        <p>N/A</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </Auth>
  )
}

export default UserOrdersScreen
