import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  Alert,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import Loader from '../components/Loader';
import CountOptions from '../components/CountOptions';
import store from '../store.js';

// console.log(store.getState().cart.cartItems.length);
const initialCartLength = 0;

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [visibility, setVisibility] = useState(false); //alert message visibility
  const [alertMessage, setMessage] = useState(
    //message displayed in the alert message
    `Item(s) has been added to your cart`
  );
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = async () => {
    dispatch(addToCart(product, Number(qty)));
    const currentItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems.length !== currentItems.length) {
      setMessage(`${qty} ${product.name}(s) added to your cart`);
    } else {
      setMessage(`You have added ${qty} more ${product.name}(s) to your cart`);
    }
    setVisibility(true);
    setTimeout(() => {
      setVisibility(false);
    }, 3000);
  };

  return (
    <>
      <Link className='btn btn-light my-3 rounded' to='/'>
        <i className='fas fa-arrow-left fa-2x'></i>
      </Link>
      {visibility && <Alert variant='success'>{alertMessage}</Alert>}
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
