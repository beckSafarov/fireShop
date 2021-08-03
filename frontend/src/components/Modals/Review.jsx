import { useState, useEffect } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { Message, Spinner } from '..'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  productReviewAction as newRev,
  listProductDetails as getProduct,
  productReviewUpdateAction as updateRev,
} from '../../actions/productActions'
import { PRODUCT_REVIEW_PROPERTY_RESET as revReset } from '../../constants'
import Rate from '../Product/Rate'

const defaultProps = {
  modal: {
    display: true,
    _id: '3432432',
    user: '332244ffe3',
  },
  setModal: (modal) => (defaultProps.modal = modal),
}

const Review = ({
  modal = defaultProps.modal,
  setModal = defaultProps.setModal,
}) => {
  const dispatch = useDispatch()

  // redux stores
  const {
    loading: revLoading,
    success,
    error,
  } = useSelector((state) => state.productReviewStore)
  const { loading: detailsLoading, product } = useSelector(
    (state) => state.productDetails
  )

  // hooks
  const [flashMsg, setFlashMsg] = useState({})
  const [clearExisting, setClearExisting] = useState(false)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  // const [fields, setFields] = useState({
  //   rating: '5',
  //   comment: '',
  // })

  // variables
  const dataExists = product && product.reviews && product._id === modal._id
  const reviewed =
    dataExists && product.reviews.find((r) => r.user === modal.user)
  const loading = revLoading || detailsLoading
  let newFields

  useEffect(() => {
    !dataExists && dispatch(getProduct(modal._id))

    if (reviewed) {
      // setFields({ rating: reviewed.rating, comment: reviewed.comment })
      setRating(reviewed.rating)
      setComment(reviewed.comment)
    }

    if (success) {
      msgHandler(
        reviewed ? 'Updated successfully!' : 'Thank you for your review!'
      )
      dispatch({ type: revReset, payload: 'success' })
      setClearExisting(true)
      setTimeout(() => hide(), 1500)
    }

    if (error) {
      msgHandler(error, 'danger')
      dispatch({ type: revReset, payload: 'error' })
    }

    return () => {
      axios.CancelToken.source().cancel()
      clearExisting && dispatch(getProduct(modal._id))
    }
  }, [reviewed, success, error, dispatch])

  const hide = () => setModal({ ...modal, display: false })

  // const changesHandler = (e) => {
  //   newFields = { ...fields }
  //   newFields[e.target.name] = e.target.value
  //   setFields(newFields)
  // }

  const commentUpdate = (e) => setComment(e.target.value)

  const submitHandler = (e) => {
    e.preventDefault()
    const fields = { rating, comment }
    reviewed
      ? dispatch(updateRev(modal._id, fields, modal.user))
      : dispatch(newRev(modal._id, fields))
  }

  const msgHandler = (message, variant = 'success') => {
    setFlashMsg({ display: true, message, variant })
    setTimeout(() => setFlashMsg({}), 3000)
  }

  return (
    <Modal
      show={modal.display}
      onHide={hide}
      dialogClassName='modal-90w'
      aria-labelledby='example-custom-modal-styling-title'
    >
      <Modal.Header closeButton>
        <Modal.Title>Review</Modal.Title>
      </Modal.Header>
      <Modal.Body variant='flush'>
        {loading && <Spinner />}
        {flashMsg.display && (
          <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
        )}
        <Form>
          <Form.Group className='mb-3' controlId='rating'>
            <Form.Label>Rate</Form.Label>
            <Rate stars={rating} setStars={setRating} />
            {/* <Form.Control
              name='rating'
              as='select'
              defaultValue={fields.rating}
              size='sm'
              onChange={changesHandler}
            >
              <option value={'5'}>Excellent</option>
              <option value={'4'}>Good</option>
              <option value={'3'}>Fair</option>
              <option value={'2'}>Bad</option>
              <option value={'1'}>Poor</option>
            </Form.Control> */}
          </Form.Group>
          <Form.Group controlId='comment'>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as='textarea'
              name='comment'
              placeholder='Leave a comment here'
              style={{ height: '100px', resize: 'none' }}
              onChange={commentUpdate}
              defaultValue={comment}
            />
          </Form.Group>
          <Button
            className='btn-block'
            type='submit'
            variant='success'
            onClick={submitHandler}
          >
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Review
