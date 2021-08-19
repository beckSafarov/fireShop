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
  OrdersFilter,
} from '../../components'
import { Table, Container, Button, ButtonGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// Redux related imports
import { getAllOrders } from '../../actions/orderActions'
import { ORDERS_LIST_PROPERTY_RESET as updateReset } from '../../constants'

const OrdersListScreen = ({ history }) => {
  const [modal, setModal] = useState({})
  const [flashMsg, setFlashMsg] = useState({})
  const [textAlign, setTextAlign] = useState('center')
  const [clearSearchField, setClearSearchField] = useState(false)
  const [orders, setOrders] = useState([])
  const [selectedBtn, setSelectedBtn] = useState(1)
  const [show, setShow] = useState({})
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
      msgHandler('Updated successfully')
      setModal({})
      dispatch({ type: updateReset, payload: 'type' })
    }

    return () => axios.CancelToken.source().cancel()
  }, [dispatch, updated, noOrders])

  const msgHandler = (message, variant = 'success', s = 3) => {
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

  const filterHandler = (query) => {
    dispatch(getAllOrders(query))
  }

  const filterClearHandler = () => {
    console.log('clean')
  }

  const menuClickHandler = (e) => {
    if (selectedBtn !== Number(e.target.id)) {
      switch (Number(e.target.id)) {
        case 1:
          // dispatch(getAllOrders())
          setShow({})
          setSelectedBtn(1)
          // console.log('all orders')
          break
        case 2:
          setShow({ filter: true })
          setSelectedBtn(2)
          // console.log('filter')
          break
        case 3:
          setShow({ sort: true })
          setSelectedBtn(3)
          // console.log('sort')
          break
      }
    }
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
            <h3 className='mb-3'>All Orders</h3>
            {updateLoading && <Spinner />}
            {modal.display && (
              <UpdateDeliveryModal modal={modal} setModal={setModal} />
            )}
            {flashMsg.display && (
              <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
            )}
            <ButtonGroup>
              {['all orders', 'filter', 'sort'].map((btn, i) => (
                <Button
                  variant='info'
                  id={i + 1}
                  key={i}
                  disabled={selectedBtn === i + 1}
                  onClick={menuClickHandler}
                >
                  {btn}
                </Button>
              ))}
            </ButtonGroup>
            {show.filter ? (
              <div className='py-2'>
                <OrdersFilter />
              </div>
            ) : show.sort ? (
              <p>This feature is inshaallah coming soon!</p>
            ) : (
              <p></p>
            )}
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
