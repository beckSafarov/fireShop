// libraries & methods
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
// ui components
import {
  Loader,
  Message,
  CheckOutSteps,
  FormContainer,
  Exceptional,
  Spinner,
} from '../../components'
import { ShaddressReadForm, ShaddressUpdateForm } from '../../components/Forms'

// redux related
import { createShaddress } from '../../actions/userActions'
import Auth from '../../components/Auth'
import {
  SHADDRESS_PROPERTY_RESET as shaddresReset,
  USER_INFO_UPDATE,
} from '../../constants'

const defaultFields = {
  address: '',
  city: '',
  postalCode: '',
  country: '',
}

const ShippingScreen = ({ history, location, match }) => {
  // redux related
  const dispatch = useDispatch()
  const {
    loading,
    success: updated,
    error: updateError,
  } = useSelector((state) => state.shaddress)
  const { userInfo } = useSelector((state) => state.userLogin)
  const shaddress =
    userInfo && userInfo.shippingAddress ? userInfo.shippingAddress : null
  const { cartItems } = useSelector((state) => state.cart)

  // variables
  const basicFields = shaddress || defaultFields
  const emptyCart =
    userInfo && userInfo.cartItems.length === 0 && cartItems.length === 0
  const hasAddress = userInfo && userInfo.shippingAddress ? true : false
  let newFields

  // hooks
  const [fields, setFields] = useState({ ...basicFields })
  const [editBtnClicked, setEditBtnClicked] = useState(false)
  const [flashMsg, setFlashMsg] = useState({})
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    userInfo && emptyCart && history.push('/')

    if (updated || updateError) {
      if (updated) {
        dispatch({
          type: USER_INFO_UPDATE,
          payload: { shippingAddress: fields },
        })
        setEditBtnClicked(false)
      }
      updated
        ? msgHandler('Updated successfully')
        : msgHandler(updateError, 'danger')
      dispatch({ type: shaddresReset, payload: updated ? 'success' : 'error' })
      setChanged(false)
    }

    return () => axios.CancelToken.source().cancel()
  }, [emptyCart, shaddress, updated, updateError])

  const confirmHandler = () => history.push('/payment')

  const createAddressHandler = (e) => {
    e.preventDefault()
    dispatch(createShaddress(fields))
  }

  const changesHandler = (e) => {
    e.persist()
    setChanged(true)
    newFields = { ...fields }
    newFields[e.target.name] = e.target.value
    setFields(newFields)
    console.log(changed)
  }

  const editBtnHandler = () => setEditBtnClicked(!editBtnClicked)

  const cancelChanges = () => {
    setFields({ ...basicFields })
    setChanged(false)
    setEditBtnClicked(!editBtnClicked)
  }

  const functionsForReadForm = {
    onClick: editBtnHandler,
    onProceed: confirmHandler,
  }

  const functionsForUpdateForm = {
    submitHandler: createAddressHandler,
    changesHandler,
    cancelChanges,
  }

  const values = { ...fields, changed }

  const msgHandler = (message, variant = 'success') => {
    setFlashMsg({ display: true, variant, message })
    setTimeout(() => setFlashMsg({}), 3000)
  }

  return (
    <Auth history={history}>
      <FormContainer>
        <CheckOutSteps step1 step2 />
        <h1>Shipping Address</h1>
        {loading && <Spinner />}
        {flashMsg.display && (
          <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
        )}
        {editBtnClicked || !hasAddress ? (
          <ShaddressUpdateForm
            values={values}
            functions={functionsForUpdateForm}
            profile={false}
            addressExists={hasAddress}
          />
        ) : (
          <ShaddressReadForm
            values={fields}
            functions={functionsForReadForm}
            profile={false}
          />
        )}
      </FormContainer>
    </Auth>
  )
}

export default ShippingScreen
