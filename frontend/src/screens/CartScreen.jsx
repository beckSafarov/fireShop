// -- methods & libraries --
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// -- helpers --
import { Calculations } from '../helpers/calculations';
import * as cartLcs from '../helpers/cartLCS';
import * as qtyLcs from '../helpers/qtyLCS';
// -- ui components --
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import Loader from '../components/Loader';
// -- redux related imports --
import { qtsReset, removeItem } from '../actions/cartActions';
import { CART_PROPERTY_RESET } from '../constants';

const CartScreen = ({ history }) => {
  const [msg, setMsg] = useState({
    display: false,
    variant: 'info',
    message: '',
  });

  const dispatch = useDispatch();

  // variables
  const { userInfo } = useSelector((state) => state.userLogin);
  const logged = userInfo ? true : false;
  // const cartItems = userInfo ? userInfo.cartItems : cartLcs.getCart();

  const [cartItems, setCartItems] = useState(
    userInfo ? userInfo.cartItems : cartLcs.getCart()
  );
  const { loading, successType, error } = useSelector((state) => state.cart);
  const calcs = Calculations(cartItems);

  useEffect(() => {
    if (successType && successType === 'reset') {
      qtyLcs.flush();
      rxReset('successType');
      history.push('/shipping');
    }
    if (error) {
      msg.message = error;
      rxReset('error');
      setMsg(msg);
      setMsgHandler('danger', 3);
    }

    return () => axios.CancelToken.source().cancel();
  }, [dispatch, successType, error]);

  const removeFromCart = (id, name) => {
    const c = `Are you sure to delete ${name} from your cart?`;
    if (window.confirm(c)) dispatch(removeItem(id, logged));
  };

  const qtyResetHandler = (id, qty) => {
    logged ? qtyLcs.add({ _id: id, qty }) : cartLcs.qtyUpdate({ _id: id, qty });
    if (logged) {
      let currItems = cartItems;
      for (let i = 0; i < currItems.length; i++) {
        if (currItems[i]._id === id) {
          currItems[i].qty = Number(qty);
          break;
        }
      }
      setCartItems(currItems);
    }
  };

  const checkoutHandler = () => {
    if (logged) {
      !qtyLcs.isEmpty()
        ? dispatch(qtsReset(qtyLcs.getQts()))
        : history.push('/shipping');
    } else {
      history.push('/signin?redirect=shipping');
    }
  };

  const setMsgHandler = (variant = 'info', seconds = 2) => {
    setMsg({ ...msg, display: true, variant });
    setTimeout(() => {
      setMsg({ ...msg, display: false });
    }, seconds * 1000);
  };

  const rxReset = (property) =>
    dispatch({ type: CART_PROPERTY_RESET, payload: property });

  return (
    <>
      {loading && <Loader />}
      {cartItems ? (
        <>
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <Row>
              <Col md={8}>
                <h1>Shopping Cart</h1>
                {msg.display && (
                  <Message variant={msg.variant}>{msg.message}</Message>
                )}
                <ListGroup variant='flush'>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      newQty={qtyLcs.getQts()[item._id]}
                      qtyResetHandler={qtyResetHandler}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </ListGroup>
                {/* <Col md={2}>
                  <Row>
                    <Button>Clear All</Button>
                  </Row>
                </Col> */}
              </Col>
              <Col md={4}>
                {calcs.subtotal !== 0 && (
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        {console.log(cartItems)}
                        <h4>Subtotal: {calcs.subtotal}</h4>
                        <h4>Total price: ${calcs.productsPrice}</h4>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn-block'
                          disabled={cartItems.length === 0}
                          onClick={checkoutHandler}
                        >
                          Proceed to Checkout
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                )}
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CartScreen;
