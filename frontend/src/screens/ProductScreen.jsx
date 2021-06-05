// -- CORE LIBRARIES --
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Auth from '../helpers/auth';

// -- UI COMPONENTS --
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Alert,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import CountOptions from '../components/CountOptions';

// -- REDUX ACTIONS
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import store from '../store';

const ProductScreen = ({ match, history }) => {
  // -- hooks --
  const [qty, setQty] = useState(1);
  const [visibility, setVisibility] = useState(false);
  const [alertMessage, setMessage] = useState(
    `Item(s) has been added to your cart`
  );
  const [productAdded, setProductAdded] = useState(false);
  const [flashMsg, setFlashMsg] = useState({
    display: false,
    msg: null,
    variant: 'danger',
  });

  // -- bringing redux stores --
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const cart = useSelector((state) => state.cart);
  const {
    loading: productDetailsLoading,
    error: productDetailsError,
    product,
  } = productDetails;

  // variables
  const auth = Auth();
  const cancelTokenSource = axios.CancelToken.source();
  let loading = productDetailsLoading || auth.loading || cart.loading;
  let error = productDetailsError || cart.error;

  useEffect(() => {
    if (product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
    }

    const unsubscribe = store.subscribe(() => {
      let cart = store.getState().cart;
      if (productAdded) {
        if (cart.success) {
          flashMessage(cart.message, 'success');
        } else if (cart.error) {
          flashMessage(cart.error);
        }
        setProductAdded(false);
      }
    });

    return () => {
      cancelTokenSource.cancel();
      unsubscribe();
    };
  }, [dispatch, product._id, match, productAdded, error]);

  // -- handle items added to cart --
  const addToCartHandler = async () => {
    auth.logged
      ? dispatch(addToCart(product, Number(qty)))
      : history.push(`/signin?redirect=product/${product._id}`);
    setProductAdded(true);
  };

  const flashMessage = (msg, variant = 'danger', seconds = 3) => {
    setFlashMsg({ display: true, msg, variant });
    setTimeout(() => {
      setFlashMsg({ display: false });
    }, seconds * 1000);
  };

  return (
    <>
      <Link className='btn btn-light my-3 rounded' to='/'>
        <i className='fas fa-arrow-left fa-2x'></i>
      </Link>
      {flashMsg.display && (
        <Alert variant={flashMsg.variant}>{flashMsg.msg}</Alert>
      )}
      {loading ? (
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
                <Button
                  onClick={addToCartHandler}
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
