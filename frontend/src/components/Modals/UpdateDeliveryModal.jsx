import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// UI components
import { Modal, Form, Row, Button } from 'react-bootstrap'
import { Message, Spinner } from '..'
import { updateDeliveryStatus } from '../../actions/orderActions'
import axios from 'axios'
import { ORDER_UPDATE_RESET as updateReset } from '../../constants'

const numToSteps = {
  1: 'Received',
  2: 'Packed',
  3: 'Shipped',
  4: 'Delivered',
}
const stepsToNum = {
  Received: 1,
  Packed: 2,
  Shipped: 3,
  Delivered: 4,
}

const UpdateDeliveryModal = ({ modal, setModal }) => {
  const dispatch = useDispatch()
  const [_id, setId] = useState(modal._id)
  const [deliveryStatus, setDeliveryStatus] = useState(modal.deliveryStatus)
  const [change, setChange] = useState(false)
  const [flashMsg, setFlashMsg] = useState({})

  const { loading, success, type, error } = useSelector(
    (state) => state.orderDetails
  )
  // const [success, setSuccess] = useState(false)
  // const type = 'update'
  const updateLoading = loading && type === 'update'

  useEffect(() => {
    if (error && type === 'update') {
      setMsgHandler(error) && setChange(false)
      dispatch({ type: updateReset, payload: 'error' })
    }

    if (!_id || modal._id === _id) {
      setId(modal._id)
      setDeliveryStatus(modal.deliveryStatus)
    }

    return () => axios.CancelToken.source().cancel()
  }, [error, success, modal])

  const submitHandler = (e) => {
    e.preventDefault()
    // setSuccess(true)
    dispatch(updateDeliveryStatus(_id, { deliveryStatus }))
  }

  const hide = () => setModal({ ...modal, display: false })

  const setMsgHandler = (message, variant = 'danger', s = 3) => {
    setFlashMsg({ display: true, message, variant })
    setTimeout(() => setFlashMsg({}), s * 1000)
  }

  const selectHandler = (e) => {
    setChange(true)
    setDeliveryStatus(numToSteps[e.target.value])
  }

  return (
    <Modal
      show={modal.display}
      onHide={hide}
      dialogClassName='modal-90w'
      aria-labelledby='example-custom-modal-styling-title'
    >
      <Modal.Header closeButton>
        <Modal.Title id='example-custom-modal-styling-title'>{_id}</Modal.Title>
      </Modal.Header>
      {updateLoading && <Spinner />}
      {flashMsg.display && (
        <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
      )}
      <Modal.Body variant='flush'>
        <Form>
          <Form.Control
            as='select'
            defaultValue={stepsToNum[deliveryStatus]}
            onChange={(e) => selectHandler(e)}
          >
            <option value={1}>Received</option>
            <option value={2}>Packed</option>
            <option value={3}>Shipped</option>
            <option value={4}>Delivered</option>
          </Form.Control>
          <div className='mt-4'>
            <Button
              className='btn-block'
              type='button'
              variant='success'
              disabled={!change}
              onClick={submitHandler}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

// UpdateDeliveryModal.defaultProps = {
//   modal: {
//     display: false,
//     _id: '3223ewf243fecd',
//     deliveryStatus: 'Received',
//   },
//   setModal: () => console.log('no func passed'),
// }

export default UpdateDeliveryModal
