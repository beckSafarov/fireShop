// Methods
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// UI components
import { Message, Loader, Auth, Exceptional } from '../../components'
import { Table, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// Redux related imports
import { getAllOrders } from '../../actions/orderActions'

const OrdersListScreen = ({ history }) => {
  // -- redux stores --
  const dispatch = useDispatch()
  const { loading, orders, error } = useSelector(
    (state) => state.ordersListStore
  )

  useEffect(() => {
    if (!orders || orders.length === 0) dispatch(getAllOrders())
    return () => axios.CancelToken.source().cancel()
  }, [dispatch])

  return (
    <Auth history={history}>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <h3 className='mb-5'>All Orders</h3>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>
                      {order.paidAt
                        ? order.paidAt.substring(0, 10)
                        : 'undefined'}
                    </td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {
                        /*if order delievered, put delivery date, if no delivery date than undefined */
                        order.isDelievered ? (
                          order.deliveredAt ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            'undefined'
                          )
                        ) : (
                          /* if order not delivered */
                          <div className='text-center'>
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          </div>
                        )
                      }
                    </td>
                    <td>
                      <LinkContainer to={`/myorders/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
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

export default OrdersListScreen
