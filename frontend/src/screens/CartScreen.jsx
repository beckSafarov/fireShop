import { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart } from '../actions/cartActions';
import { getProductPrices } from '../actions/productActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = new URLSearchParams(useLocation().search).get('qty');
  const dispatch = useDispatch();

  //getting current cartItems from redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const ids = cartItems.map((item) => item._id);

  //getting current cart item prices from store
  const pricesFromStore = useSelector((state) => state.productPrices);
  const { loading, prices, error } = pricesFromStore;

  useEffect(() => {
    dispatch(getProductPrices(ids));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <p>{prices ? prices[0] : 'undefined'}</p>
      )}
    </>
  );
};

export default CartScreen;
