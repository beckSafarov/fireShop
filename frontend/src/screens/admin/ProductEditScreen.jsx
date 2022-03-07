// libraries & methods
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
// UI components
import { Auth, FormContainer, Message, Spinner } from '../../components'
import { ProductUpdateForm } from '../../components/Forms'
import { imgUpload, updateProduct } from '../../actions/adminActions'
import { listProductDetails } from '../../actions/productActions'
import { IMG_UPLOAD_RESET, PRODUCT_DETAILS_RESET } from '../../constants'

const ProductEditScreen = ({ history, match }) => {
  // redux stuff
  const dispatch = useDispatch()
  const {
    loading: requestLoading,
    success,
    type,
    product,
    error,
  } = useSelector((state) => state.productDetails)
  const {
    loading: uploadLoading,
    success: uploaded,
    data: uploadData,
    error: uploadError,
  } = useSelector((state) => state.imgUploadStore)

  // variables
  const requestError = error && type === 'request' ? error : null
  const loading = requestLoading || uploadLoading

  const dataExists = product && product.name && product._id === match.params.id
  let newProduct

  // hooks
  const [change, setChange] = useState(false)
  const [flashMsg, setFlashMsg] = useState({})
  const [uploadLabel, setUploadLabel] = useState('No File Chosen')
  const [updatedProduct, setUpdatedProduct] = useState(
    dataExists ? { ...product } : {}
  )
  const [came, setCame] = useState(false)

  useEffect(() => {
    if (!came) {
      window.scrollTo(0, 0)
      setCame(true)
    }

    dataExists
      ? !updatedProduct.name && setUpdatedProduct({ ...product })
      : dispatch(listProductDetails(match.params.id))

    if ((success || error) && type === 'update') {
      success
        ? history.replace('/admin/productlist')
        : msgHandler(error, 'danger')
      dispatch({
        type: PRODUCT_DETAILS_RESET,
        payload: success ? 'success' : 'error',
      })
    }

    if (uploaded || uploadError) {
      if (uploaded) {
        setUpdatedProduct({ ...updatedProduct, image: uploadData })
        setChange(true)
      }
      uploadError && msgHandler(uploadError, 'danger', 5)
      dispatch({ type: IMG_UPLOAD_RESET })
    }

    return () => {
      axios.CancelToken.source().cancel()
      setCame(false)
      setChange(false)
    }
  }, [dispatch, product, match, success, error, uploaded, uploadError])

  const changesHandler = (e) => {
    setChange(true)
    newProduct = { ...updatedProduct }
    newProduct[e.target.name] = e.target.value
    setUpdatedProduct(newProduct)
  }

  const uploadImgHandler = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploadLabel(file.name)
    dispatch(imgUpload(formData))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ ...updatedProduct }))
    setChange(false)
  }

  const msgHandler = (msg, variant = 'success', s = 3) => {
    setFlashMsg({ display: true, message: msg, variant })
    setTimeout(() => setFlashMsg({}), 3000)
    setTimeout(() => setFlashMsg({}), s * 1000)
  }

  const cancelChanges = () => window.location.reload()

  const values = { ...updatedProduct, change, uploadLabel }
  const functions = {
    changesHandler,
    uploadImgHandler,
    submitHandler,
    cancelChanges,
  }

  return (
    <Auth history={history} adminOnly>
      <FormContainer>
        <h2>{product && product.name}</h2>
        <Spinner hidden={!loading} />
        <Message variant='danger'>{requestError}</Message>
        <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
        <div className='py-4'>
          <div className='centered-img'>
            <img src={updatedProduct.image} alt='Product Image' />
          </div>
          <ProductUpdateForm values={values} functions={functions} />
        </div>
      </FormContainer>
    </Auth>
  )
}

export default ProductEditScreen
