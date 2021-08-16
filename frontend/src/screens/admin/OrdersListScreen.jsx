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
  AdminSearch,
} from '../../components'
import { Table, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// Redux related imports
import { getAllOrders, getOrderDetails } from '../../actions/orderActions'
import { ORDERS_LIST_PROPERTY_RESET as updateReset } from '../../constants'

const OrdersListScreen = ({ history }) => {
  const [modal, setModal] = useState({})
  const [flashMsg, setFlashMsg] = useState({})
  const [textAlign, setTextAlign] = useState('center')
  const [clearSearchField, setClearSearchField] = useState(false)
  const [orders, setOrders] = useState([])
  // -- redux stores --
  const dispatch = useDispatch()

  // all orders
  const {
    loading: listLoading,
    orders: allOrders,
    success,
    type,
    error,
  } = useSelector((state) => state.ordersListStore)

  // one order
  const updated = success && type === 'update'
  const { loading: updateLoading } = useSelector((state) => state.orderDetails)

  const noOrders = !allOrders || allOrders.length === 0

  useEffect(() => {
    noOrders ? dispatch(getAllOrders()) : setOrders(allOrders)

    if (updated) {
      setMsgHandler('Updated successfully')
      setModal({})
      dispatch({ type: updateReset, payload: 'type' })
    }

    return () => axios.CancelToken.source().cancel()
  }, [dispatch, updated, noOrders])

  const setMsgHandler = (message, variant = 'success', s = 3) => {
    setFlashMsg({ display: true, message, variant })
    setTimeout(() => setFlashMsg({}), s * 1000)
  }

  const updateHandler = (order) => {
    setModal({
      display: true,
      _id: order._id,
      deliveryStatus: order.deliveryStatus,
    })
  }

  const LocaleDate = (d) => {
    const date = new Date(d)
    return date.toLocaleString()
  }

  const searchHandler = (keyword) => {
    dispatch(getOrderDetails(keyword))
  }

  const searchClearHandler = () => {
    console.log('clean')
  }

  return (
    <Auth history={history} adminOnly>
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
            <div className='py-4'></div>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>PAID</th>
                  <th>DELIVERY STATUS</th>
                  <th>DELIVERY DATE</th>
                </tr>
              </thead>
              <tbody style={{ textAlign }}>
                {/* {console.log(orders)} */}
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button variant='link'>{order._id}</Button>
                      </LinkContainer>
                    </td>
                    <td>{order.user.name}</td>
                    <td>
                      {order.paidAt
                        ? order.paidAt.substring(0, 10)
                        : 'undefined'}
                    </td>
                    <td>${order.totalPrice}</td>
                    <td>
                      <p
                        title='update status'
                        onClick={() => updateHandler(order)}
                        className='simple-link'
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

export default OrdersListScreen
