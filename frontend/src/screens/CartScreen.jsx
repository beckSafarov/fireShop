// -- methods & libraries --
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// -- helpers --
import { Calculations } from '../helpers/Calculations';
import * as cartLcs from '../helpers/cartLCS';
import * as qtyLcs from '../helpers/qtyLCS';

// -- ui components --
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import {
  Message,
  CartItem,
  EmptyCart,
  Spinner,
  ConfirmModal,
  Exceptional,
} from '../components';

// -- redux related imports --
import { qtyReset, removeItem } from '../actions/cartActions';
import { CART_PROPERTY_RESET as cartReset } from '../constants';

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();
  // hooks
  const [cartItems, setCartItems] = useState(cartLcs.getCart());
  const [flashMsg, setFlashMsg] = useState({});
  const [confirmModal, setConfirmModal] = useState({});

  // redux stores and related stuff
  const { userInfo: logged } = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);
  const { loading: cartLoading, error } = cart;

  // variables
  const updating = cartItems && cartLoading;
  const calcs = Calculations(cartItems);

  useEffect(() => {
    error && msgHandler(error);
    cart && setCartItems(cart.cartItems);

    return () => {
      axios.CancelToken.source().cancel();
      dispatch({ type: cartReset, payload: 'error' });
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

  const qtyResetHandler = (id, qty) =>
    dispatch(qtyReset({ _id: id, qty: Number(qty) }, logged));

  const checkoutHandler = () =>
    history.push(logged ? '/shipping' : '/signin?redirect=shipping');

  const msgHandler = (message, variant = 'danger') => {
    setFlashMsg({ display: true, message, variant });
    setTimeout(() => setFlashMsg({}), 3000);
  };

  const proceedModalHandler = (e) => {
    e.preventDefault();
    hideModalHandler();
    dispatch(removeItem(confirmModal._id, logged));
  };

  const hideModalHandler = () =>
    setConfirmModal({ ...confirmModal, display: false });

  return (
    <>
      {cartItems ? (
        <>
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <Row>
              {updating && <Spinner />}
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
                {flashMsg.display && (
                  <Message variant={flashMsg.variant}>
                    {flashMsg.message}
                  </Message>
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

export default CartScreen;
