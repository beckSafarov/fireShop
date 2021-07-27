// Methods
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// UI components
import {
  Message,
  Loader,
  Auth,
  UpdateDeliveryModal,
  Spinner,
} from '../../components'
import { Table, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// Redux related imports
import { getAllOrders } from '../../actions/orderActions'
import { ORDERS_LIST_PROPERTY_RESET as updateReset } from '../../constants'

const OrdersListScreen = ({ history }) => {
  const [modal, setModal] = useState({})

  // -- redux stores --
  const dispatch = useDispatch()
  const {
    loading: listLoading,
    orders,
    success,
    type,
    error,
  } = useSelector((state) => state.ordersListStore)
  const [flashMsg, setFlashMsg] = useState({})

  const updated = success && type === 'update'

  const { loading: updateLoading } = useSelector((state) => state.orderDetails)

  useEffect(() => {
    if (!orders || orders.length === 0) dispatch(getAllOrders())

    if (updated) {
      setMsgHandler('Updated successfully')
      dispatch({ type: updateReset, payload: 'type' })
    }

    return () => axios.CancelToken.source().cancel()
  }, [dispatch, updated])

  const setMsgHandler = (message, variant = 'success', s = 3) => {
    setFlashMsg({ display: true, message, variant })
    setTimeout(() => setFlashMsg({}), s * 1000)
  }

  const sendToOrderInfo = (id) => history.push(`/orders/${id}`)

  const updateHandler = (order) => {
    setModal({
      display: true,
      _id: order._id,
      deliveryStatus: order.deliveryStatus,
    })
  }

  return (
    <Auth history={history}>
      <Container>
        {listLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <h3 className='mb-5'>All Orders</h3>
            {updateLoading && <Spinner />}
            {modal.display && (
              <UpdateDeliveryModal modal={modal} setModal={setModal} />
            )}
            {flashMsg.display && (
              <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
            )}
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>PAID</th>
                  <th>DELIVERY STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <p
                        onClick={() => sendToOrderInfo(order._id)}
                        className='simple-link'
                        title='Go to Page'
                      >
                        {order._id}
                      </p>
                    </td>
                    <td>{order.user.name}</td>
                    <td>
                      {order.paidAt
                        ? order.paidAt.substring(0, 10)
                        : 'undefined'}
                    </td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isDelieverd ? (
                        <p
                          className='simple-link'
                          style={{ color: 'green', textAlign: 'center' }}
                        >
                          Delivered
                        </p>
                      ) : (
                        <p
                          title='update status'
                          onClick={() => updateHandler(order)}
                          className='centered-text simple-link'
                        >
                          {order.deliveryStatus}
                        </p>
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

export default OrdersListScreen
