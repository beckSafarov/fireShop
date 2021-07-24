// -- LIBRARIES/METHODS --
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// -- COMPONENTS --
import { ShaddressReadForm, ShaddressUpdateForm } from '../../components/Forms'
import { Auth, Message, AccountSideMenu, Spinner } from '../../components'

// -- REDUX RELATED IMPORTS --
import { updateUserProfile as update } from '../../actions/userActions'
import { USER_DETAILS_PROPERTY_RESET as userInfoReset } from '../../constants'
import { USER_INFO_UPDATE } from '../../constants'
import ObjectsCompare from '../../helpers/ObjectsCompare'
const defaultFields = {
  address: '',
  city: '',
  postalCode: '',
  country: '',
}

const ShaddressScreen = ({ history }) => {
  const dispatch = useDispatch()

  // redux stores
  const { userInfo } = useSelector((state) => state.userLogin)
  const shaddress =
    userInfo && userInfo.shippingAddress ? userInfo.shippingAddress : null
  const {
    loading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.userDetailsUpdate)

  //variables
  let newFields
  const basicFields = shaddress || defaultFields

  //hooks
  const [fields, setFields] = useState({ ...basicFields })
  const [editClicked, setEditClicked] = useState(false)
  const [flashMsg, setFlashMsg] = useState({})

  useEffect(() => {
    if (updateSuccess) {
      dispatch({
        type: USER_INFO_UPDATE,
        payload: { shippingAddress: fields },
      })
      setEditClicked(false)
      setMsgHandler('Updated successfully')
      rxReset('success')
    }

    if (updateError) {
      setMsgHandler(updateError, 'danger')
      rxReset('error')
    }

    return () => axios.CancelToken.source().cancel()
  }, [updateSuccess, updateError])

  const setMsgHandler = (message, variant = 'success') => {
    setFlashMsg({ display: true, variant, message })
    setTimeout(() => setFlashMsg({}), 3000)
  }

  const editBtnHandler = () => setEditClicked(!editClicked)

  const updateShaddressHandler = async (e) => {
    e.preventDefault()
    const ch = ObjectsCompare(basicFields, fields)
    ch && dispatch(update({ shippingAddress: fields }))
  }

  const changesHandler = (e) => {
    e.persist()
    newFields = { ...fields }
    newFields[e.target.name] = e.target.value
    setFields(newFields)
  }

  const cancelChanges = () => {
    setFields({ ...basicFields })
    setEditClicked(false)
  }

  const rxReset = (payload) => dispatch({ type: userInfoReset, payload })

  // functions to pass to form components
  const funcsToEditForm = {
    submitHandler: updateShaddressHandler,
    changesHandler,
    cancelChanges,
  }

  return (
    <Auth history={history}>
      <Row>
        <>
          {loading && <Spinner />}
          <Col md={2} sm={2}>
            <AccountSideMenu active={2} />
          </Col>
          <Col md={10} sm={10}>
            <h3 className='mb-4'>Address</h3>
            {flashMsg.display && (
              <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
            )}
            {editClicked ? (
              <ShaddressUpdateForm
                values={fields}
                functions={funcsToEditForm}
              />
            ) : (
              <ShaddressReadForm
                values={fields}
                functions={{ onClick: editBtnHandler }}
              />
            )}
          </Col>
        </>
      </Row>
    </Auth>
  )
}

export default ShaddressScreen
