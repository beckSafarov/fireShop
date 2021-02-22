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
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = new URLSearchParams(useLocation().search).get('qty');
  const dispatch = useDispatch();

  //getting current cartItems from redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length > 0 ? (
            <ListGroup variant='flush'></ListGroup>
          ) : (
            <Message>
              Your cart is empty <Link to='/'>Go back</Link>
            </Message>
          )}
        </Col>
        <Col md={2}></Col>
        <Col md={2}></Col>
      </Row>
    </>
  );
};

export default CartScreen;
