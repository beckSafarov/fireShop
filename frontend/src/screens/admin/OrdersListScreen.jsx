// Methods
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// UI components
import {
  Message,
  Auth,
  UpdateDeliveryModal,
  Spinner,
  OrdersFilter,
  OrdersSort,
} from '../../components'
import {
  Table,
  Container,
  Button,
  ButtonGroup,
  Collapse,
  Fade,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// Redux related imports
import {
  getAllOrders,
  getFilteredOrders as filter,
} from '../../actions/orderActions'
import {
  ORDERS_FILTER_RESET,
  ORDERS_LIST_PROPERTY_RESET as orderPropReset,
} from '../../constants'
import { initSortVals } from '../../helpers/sortLCS'

const querify = (sortVals) => {
  let query = '?sort=true&'
  sortVals.forEach((val, i) => {
    query += `${val.sort}=${val.type}${i < sortVals.length - 1 ? '&' : ''}`
  })
  return query
}

const OrdersListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [modal, setModal] = useState({})
  const [flashMsg, setFlashMsg] = useState({})
  const [selectedBtn, setSelectedBtn] = useState(1)
  const [show, setShow] = useState({ sort: true })
  const [orders, setOrders] = useState([])

  // -- redux stores --
  // all orders
  const {
    loading: listLoading,
    orders: allOrders,
    success: allOrdersLoaded,
    type,
    error,
  } = useSelector((state) => state.ordersListStore)

  // filtered orders
  const {
    loading: filterLoading,
    orders: filteredOrders,
    error: filterFailed,
  } = useSelector((state) => state.ordersFilterStore)

  // one order
  const updated = allOrdersLoaded && type === 'update'
  const { loading: updateLoading } = useSelector((state) => state.orderDetails)
  const loading = listLoading || updateLoading || filterLoading
  const sortQuery = initSortVals(0) ? querify(initSortVals()) : ''

  // const noOrders = !allOrders || allOrders.length === 0
  const filterOn = filteredOrders && filteredOrders.length > 0

  useEffect(() => {
    if (allOrdersLoaded) {
      setOrders(allOrders)
      dispatch({ type: orderPropReset, payload: 'success' })
    }

    if (orders.length < 1) dispatch(getAllOrders(sortQuery))

    if (updated) {
      msgHandler('Updated successfully')
      setModal({})
      dispatch({ type: orderPropReset, payload: 'type' })
    }

    if (filterOn) setOrders(filteredOrders)

    if (filterFailed) {
      msgHandler(filterFailed, 'danger')
      dispatch({ type: ORDERS_FILTER_RESET })
    }

    return () => axios.CancelToken.source().cancel()
  }, [dispatch, updated, orders, allOrdersLoaded, filterOn, filterFailed])

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

  const filterHandler = (q) => dispatch(filter(q))

  const filterClearHandler = () => {
    allOrders ? setOrders(allOrders) : dispatch(getAllOrders())
    setShow({ sort: true })
    dispatch({ type: ORDERS_FILTER_RESET })
  }

  const sortHandler = (sortVals) => {
    // let query = ''
    // sortVals.forEach((val, i) => {
    //   query += `${val.sort}=${val.type}${i < sortVals.length - 1 ? '&' : ''}`
    // })
    // console.log(querify(sortVals))
    dispatch(getAllOrders(querify(sortVals)))
  }

  const menuClickHandler = (e) => {
    const { id } = e.target
    const [sort, filter] = [true, true]
    setShow(id == 1 ? { sort } : { filter })
    setSelectedBtn(id)
  }

  return (
    <Auth history={history} adminOnly>
      <Container>
        <>
          <h3 className='mb-3'>All Orders</h3>
          {loading && <Spinner />}
          {modal.display && (
            <UpdateDeliveryModal modal={modal} setModal={setModal} />
          )}

          <div className='menu-row'>
            <ButtonGroup className='menu-row-left'>
              {['sort', 'filter'].map((btn, i) => (
                <Button
                  variant='dark'
                  id={i + 1}
                  key={i}
                  // className='mb-4'
                  disabled={selectedBtn === i + 1}
                  onClick={menuClickHandler}
                >
                  {btn}
                </Button>
              ))}
            </ButtonGroup>
            <div className='menu-row-right'>
              <Fade in={filterOn}>
                <Button
                  type='button'
                  variant='light'
                  className='rounded'
                  onClick={filterClearHandler}
                >
                  {/* <i className='fas fa-undo'></i> */}
                  <i
                    style={{ fontSize: '20px', color: '#808080' }}
                    className='fas fa-times'
                  ></i>
                </Button>
              </Fade>
            </div>
          </div>
          <Collapse in={show.sort}>
            <div className='py-2'>
              <OrdersSort onSubmit={sortHandler} />
            </div>
          </Collapse>

          <Collapse in={show.filter}>
            <div className='py-2'>
              <OrdersFilter onSubmit={filterHandler} />
            </div>
          </Collapse>
          {error && <Message variant='danger'>{error}</Message>}
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
                <th>DELIVERY DATE</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {/* {console.log(orders)} */}
              {orders &&
                orders.map((order) => (
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
      </Container>
    </Auth>
  )
}

export default OrdersListScreen
