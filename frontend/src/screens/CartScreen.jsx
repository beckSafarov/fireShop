// -- methods & libraries
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Auth from '../components/Auth';
import Calculations from '../helpers/calculations';
// ui components
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CartItem from '../components/CartItem';
// redux related imports
import { getAllCartItems, qtyReset, removeItem } from '../actions/cartActions';
import store from '../store';

const CartScreen = ({ history }) => {
  const [msg, setMsg] = useState({
    display: false,
    variant: 'info',
    message: null,
  });
  const [updatedQty, setUpdatedQty] = useState({});

  //redux related
  const dispatch = useDispatch();
  const allCartItems = useSelector((state) => state.cart);
  const { loading: cartItemsLoading } = allCartItems;

  // variables
  const { userInfo } = useSelector((state) => state.userLogin);
  const cartItems = userInfo ? userInfo.cartItems : [];
  const calcs = Calculations(cartItems);
  let loading = cartItemsLoading;

  useEffect(() => {
    if (userInfo) dispatch(getAllCartItems());

    const unsubscribe = store.subscribe(() => {
      let update = store.getState().cart;
      if (update.success) {
        setMsgHandler('success');
      } else if (update.error) {
        let newMsgObj = msg;
        newMsgObj.message = update.error;
        setMsg(newMsgObj);
        setMsgHandler('danger', 3);
      }
    });

    return () => {
      axios.CancelToken.source().cancel();
      unsubscribe();
    };
  }, [userInfo, dispatch]);

  const removeFromCart = (id, name) => {
    const msg = `Are you sure to delete ${name} from your cart?`;

    if (window.confirm(msg)) dispatch(removeItem(id));
  };

  const qtyResetHandler = (id, qty) => {
    dispatch(qtyReset(id, qty));

    // prepare successful message
    let newMsgObj = msg;
    newMsgObj.message = 'Updated successfully';
    setMsg(newMsgObj);

    // update the qty in the current window
    let currUpdated = updatedQty;
    currUpdated[id] = qty;
    setUpdatedQty(currUpdated);
  };

  const checkoutHandler = () => {
    history.push(`/signin?from=cart&redirect=shipping`);
  };

  const setMsgHandler = (variant = 'info', seconds = 2) => {
    setMsg({ ...msg, display: true, variant });
    setTimeout(() => {
      setMsg({ ...msg, display: false });
    }, seconds * 1000);
  };

  return (
    <Auth history={history}>
      {loading ? (
        <Loader />
      ) : cartItems ? (
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {msg.display && (
              <Message variant={msg.variant}>{msg.message}</Message>
            )}
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty <Link to='/'>Go back</Link>
              </Message>
            ) : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    newQty={updatedQty[item._id]}
                    qtyResetHandler={qtyResetHandler}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            {calcs.subtotal !== 0 && (
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Subtotal: {calcs.subtotal} item(s)</h4>
                    <h4>Total price: ${calcs.productsPrice} </h4>
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
      ) : (
        <p>you should never see this</p>
      )}
    </Auth>
  );
};

export default CartScreen;
