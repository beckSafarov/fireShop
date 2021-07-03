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
import Spinner from '../components/Spinner';

// -- redux related imports --
import { qtyReset, removeItem } from '../actions/cartActions';
import { CART_PROPERTY_RESET } from '../constants';
import ConfirmModal from '../components/ConfirmModal';
import Exceptional from '../components/Exceptional';

const TestCartScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState(cartLcs.getCart());
  const [msg, setMsg] = useState({
    display: false,
    variant: 'info',
    message: '',
  });

  // redux stores and related stuff
  const { loading: userLoading, userInfo } = useSelector(
    (state) => state.userLogin
  );
  const cart = useSelector((state) => state.cart);
  const { loading: cartLoading, error } = cart;
  const logged = userInfo ? true : false;

  const [confirmModal, setConfirmModal] = useState({
    display: false,
    heading: 'Are you sure?',
    message: '',
  });
  const calcs = Calculations(cartItems);

  useEffect(() => {
    if (error) {
      msg.message = error;
      setMsg(msg);
      setMsgHandler('danger', 3);
    }

    if (cart) setCartItems(cart.cartItems);

    return () => {
      axios.CancelToken.source().cancel();
      dispatch({ type: CART_PROPERTY_RESET, payload: 'error' });
    };
  }, [dispatch, error, cart]);

  const confirmDeleteHandler = (id, name) => {
    const confMsg = `Are you sure to delete ${name} from your cart?`;
    setConfirmModal({
      ...confirmModal,
      display: true,
      message: confMsg,
      _id: id,
    });
  };

  const qtyResetHandler = (id, qty) => {
    dispatch(qtyReset({ _id: id, qty: Number(qty) }, logged));
  };

  const checkoutHandler = () => {
    history.push(logged ? '/shipping' : '/signin?redirect=shipping');
  };

  const setMsgHandler = (variant = 'info', seconds = 2) => {
    setMsg({ ...msg, display: true, variant });
    setTimeout(() => {
      setMsg({ ...msg, display: false });
    }, seconds * 1000);
  };

  const proceedModalHandler = (e) => {
    e.preventDefault();
    hideModalHandler();
    dispatch(removeItem(confirmModal._id, logged));
  };

  const hideModalHandler = () => {
    setConfirmModal({ ...confirmModal, display: false });
  };

  return (
    <>
      {cartLoading || (userLoading && <Spinner />)}
      {cartItems ? (
        <>
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <Row>
              <ConfirmModal
                active={confirmModal.display}
                heading={confirmModal.heading}
                message={confirmModal.message}
                confirmHandler={proceedModalHandler}
                hideHandler={hideModalHandler}
                proceedText='Delete'
                primaryVariant='danger'
              />
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
                      removeFromCart={confirmDeleteHandler}
                    />
                  ))}
                </ListGroup>
              </Col>
              <Col md={4}>
                {calcs.subtotal !== 0 && (
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
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
        <Exceptional />
      )}
    </>
  );
};

export default TestCartScreen;
