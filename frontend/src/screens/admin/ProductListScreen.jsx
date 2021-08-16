// libraries & methods
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// UI components
import { Table, Row, Col, Button } from 'react-bootstrap'
import {
  Auth,
  Message,
  ConfirmModal,
  Spinner,
  AdminSearch,
} from '../../components'

// redux actions
import { listProducts } from '../../actions/productActions'
import { addProduct, deleteProduct } from '../../actions/adminActions'
import {
  PRODUCT_LIST_PROPERTY_RESET as listReset,
  PRODUCT_SEARCH_RESET as searchReset,
} from '../../constants'
import { Link } from 'react-router-dom'

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [confirmModal, setConfirmModal] = useState({})
  const [flashMsg, setFlashMsg] = useState({})
  const [products, setProducts] = useState([])
  const [lastSearched, setLastSearched] = useState('')
  const [clearSearchField, setClearSearchField] = useState(false)

  const {
    loading: allProductsLoading,
    error,
    products: allProducts,
    success,
    type,
  } = useSelector((state) => state.productList)
  const {
    loading: searchLoading,
    products: searchedProducts,
    error: searchFailed,
  } = useSelector((state) => state.productSearchStore)

  const requestError = error && type === 'request' ? error : null
  const loading = allProductsLoading || searchLoading
  let newProduct

  useEffect(() => {
    allProducts.length === 0
      ? dispatch(listProducts())
      : setProducts(allProducts)

    if (success) {
      switch (type) {
        case 'update':
          msgHandler('Updated successfully')
          break
        case 'add':
          setProducts(allProducts)
          newProduct = allProducts.find((p) => p.new)
          history.push(`/admin/productedit/${newProduct._id}`)
          break
      }
      rxReset('success')
    }

    if (error && type !== 'request') {
      msgHandler(error, 'danger')
      rxReset('error')
    }

    if (searchedProducts) setProducts(searchedProducts)

    return () => {
      axios.CancelToken.source().cancel()
      if (searchedProducts || searchFailed) {
        searchClearHandler()
      }
    }
  }, [dispatch, success, error, allProducts, searchedProducts])

  const createProductHandler = () => {
    searchClearHandler()
    setClearSearchField(true)
    dispatch(addProduct())
  }

  const deleteHandler = () => {
    searchClearHandler()
    setClearSearchField(true)
    dispatch(deleteProduct(confirmModal._id))
    hideModalHandler()
  }

  const confirmHandler = (_id, name) => {
    setConfirmModal({
      display: true,
      heading: `Deleting ${name}`,
      message: `Are you sure to delete ${name}? This action cannot be reverted`,
      proceedText: 'Delete',
      primaryVariant: 'Danger',
      _id,
    })
  }

  const hideModalHandler = () => setConfirmModal({ display: false })

  const msgHandler = (msg, variant = 'success') => {
    setFlashMsg({ display: true, message: msg, variant })
    setTimeout(() => setFlashMsg({}), 3000)
  }

  const rxReset = (payload) => dispatch({ type: listReset, payload })

  const searchHandler = (kword) => {
    dispatch(listProducts(kword))
    setLastSearched(kword)
  }

  const searchClearHandler = () => {
    dispatch({ type: searchReset })
  }

  return (
    <Auth history={history} adminOnly>
      <Row className='align-items-center'>
        <Col>
          <h1>Product List</h1>
        </Col>
        <Col className='text-right'>
          <Button
            variant='info'
            className='my-3'
            onClick={createProductHandler}
          >
            <i className='fas fa-plus'></i> New Product
          </Button>
        </Col>
      </Row>
      {loading && <Spinner />}
      {flashMsg.display && (
        <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
      )}
      <div className='py-3'>
        <AdminSearch
          onSearch={searchHandler}
          onClear={searchClearHandler}
          reset={clearSearchField}
          setReset={setClearSearchField}
        />
      </div>
      <ConfirmModal
        active={confirmModal.display}
        heading={confirmModal.heading}
        message={confirmModal.message}
        confirmHandler={deleteHandler}
        hideHandler={hideModalHandler}
        proceedText='Delete'
        primaryVariant='danger'
      />
      {requestError ? (
        <Message variant='danger'>{requestError}</Message>
      ) : searchFailed ? (
        <>
          <h3>Not found</h3>
          <p className='py-3'>
            No product found with the name{' '}
            <span style={{ color: 'tomato' }}>{lastSearched}</span>. Try again
            with a different keyword
          </p>
        </>
      ) : (
        <Table hover responsive className='tale-sm'>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <img
                  className='product-table-img'
                  src={product.image}
                  alt={product.name}
                />
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <div className='two-horizontal-icons'>
                    <div>
                      <Link to={`/admin/productedit/${product._id}`}>
                        <i className='fas fa-edit'></i>
                      </Link>
                    </div>
                    <div>
                      <i
                        onClick={() =>
                          confirmHandler(product._id, product.name)
                        }
                        className='fas fa-trash'
                      ></i>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Auth>
  )
}

export default ProductListScreen
