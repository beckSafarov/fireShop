// -- CORE LIBRARIES --
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
// -- Helpers
import * as lcs from '../helpers/cartLCS'
// -- UI COMPONENTS --
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Alert,
} from 'react-bootstrap'
import { Rating, Loader, CountOptions, Exceptional } from '../components'

// -- REDUX ACTIONS
import { listProductDetails } from '../actions/productActions'
import { addToCart, buyNowAction } from '../actions/cartActions'
import { CART_PROPERTY_RESET } from '../constants'

const ProductScreen = ({ match, history }) => {
  // -- hooks --
  const [qty, setQty] = useState(1)
  const [flashMsg, setFlashMsg] = useState({
    display: false,
    msg: null,
    variant: 'danger',
  })

  // -- bringing redux stores --
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const { userInfo } = useSelector((state) => state.userLogin)
  const {
    successType,
    error: cartError,
    message: cartMessage,
  } = useSelector((state) => state.cart)
  const logged = userInfo ? true : false
  const dataExists = product && product.name && product._id === match.params.id

  useEffect(() => {
    !dataExists && dispatch(listProductDetails(match.params.id))

    if (successType) {
      switch (successType) {
        case 'add':
          flashMessage(cartMessage, 'success')
          break
        case 'buyNow':
          history.push(
            logged
              ? userInfo.shippingAddress
                ? '/placeorder'
                : '/shipping'
              : '/signin?redirect=shipping'
          )
          break
      }
      rxReset('successType')
    } else if (cartError) {
      flashMessage(cartError)
      rxReset('error')
    }

    return () => axios.CancelToken.source().cancel()
  }, [dispatch, match, successType, cartError])

  const addToCartHandler = () => {
    const more = lcs.have(product) ? 'more' : ''
    dispatch(addToCart(product, Number(qty), logged))

    if (!logged) {
      const text = `You added ${qty} ${more} ${product.name}(s) to your shopping cart`
      flashMessage(text, 'success')
    }
  }

  const buyNowHandler = () => {
    dispatch(buyNowAction(product, Number(qty), logged))
  }

  const flashMessage = (msg, variant = 'danger', seconds = 3) => {
    setFlashMsg({ display: true, msg, variant })
    setTimeout(() => {
      setFlashMsg({ display: false })
    }, seconds * 1000)
  }

  const rxReset = (property) =>
    dispatch({ type: CART_PROPERTY_RESET, payload: property })

  return (
    <>
      <Link className='btn btn-light my-3 rounded' to='/'>
        <i className='fas fa-arrow-left fa-2x'></i>
      </Link>
      {flashMsg.display && (
        <Alert variant={flashMsg.variant}>{flashMsg.msg}</Alert>
      )}
      {loading || !product ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Price:</strong> ${product.price}
              </ListGroup.Item>

              <ListGroup.Item>
                <h5>Description</h5>
                {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        <CountOptions countInStock={product.countInStock} />
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  <Button
                    onClick={addToCartHandler}
                    variant='outline-primary'
                    type='button'
                    disabled={product.countInStock === 0}
                    block
                  >
                    Add to cart
                  </Button>
                </Row>
                <Row className='my-1'>
                  <Button
                    onClick={buyNowHandler}
                    variant='primary'
                    type='button'
                    disabled={product.countInStock === 0}
                    block
                  >
                    Buy Now
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
