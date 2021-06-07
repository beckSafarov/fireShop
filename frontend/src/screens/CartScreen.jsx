// -- METHODS & LIBRARIES
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Auth from '../helpers/auth';
import Calculations from '../helpers/calculations';

// -- UI COMPONENTS
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CartItem from '../components/CartItem';

// -- REDUX RELATED IMPORTS --
import { getAllCartItems, qtyReset, removeItem } from '../actions/cartActions';
import store from '../store';

const CartScreen = ({ history }) => {
  const [msg, setMsg] = useState({
    display: false,
    variant: 'info',
    message: null,
  });
  const [updatedQty, setUpdatedQty] = useState([]);

  //redux related
  const dispatch = useDispatch();
  const allCartItems = useSelector((state) => state.cart);
  const { loading: cartItemsLoading } = allCartItems;

  // variables
  const auth = Auth();
  const cartItems = auth.userInfo ? auth.userInfo.cartItems : [];
  const calcs = Calculations(cartItems);
  let loading = cartItemsLoading || auth.loading;

  useEffect(() => {
    if (auth.logged === false) {
      history.push('/signin?redirect=cart');
    } else if (auth.logged) dispatch(getAllCartItems());

    const unsubscribe = store.subscribe(() => {
      let update = store.getState().cart;
      if (update.success) {
        setMsgHandler('success');
      } else if (update.error) {
        setMsg({ ...msg, message: update.error });
        setMsgHandler('danger', 3);
      }
    });

    return () => {
      axios.CancelToken.source().cancel();
      unsubscribe();
    };
  }, [auth.logged, dispatch]);

  const removeFromCart = (id, name) => {
    if (window.confirm(`Are you sure to delete ${name} from your cart?`))
      dispatch(removeItem(id));
  };

  const updatedQtyHandler = (id, qty) => {
    if (updatedQty.length === 0) {
      let newUpdatedQty = updatedQty;
      newUpdatedQty.push({ _id: id, qty });
      setUpdatedQty(newUpdatedQty);
    } else {
      for (let i = 0; i < updatedQty.length; i++) {
        if (updatedQty[i]._id === id) {
          let newUpdatedQty = updatedQty;
          newUpdatedQty[i].qty = qty;
          setUpdatedQty(newUpdatedQty);
          break;
        }
        if (i === updatedQty.length - 1) {
          let newUpdatedQty = updatedQty;
          newUpdatedQty.push({ _id: id, qty });
          setUpdatedQty(newUpdatedQty);
        }
      }
    }
  };

  const qtyResetHandler = (id, qty) => {
    dispatch(qtyReset(id, qty));
    updatedQtyHandler(id, qty);
    let newMsgObj = msg;
    newMsgObj.message = 'Updated successfully';
    setMsg(newMsgObj);
  };

  const checkoutHandler = () => {
    history.push('/signin?from=cart&redirect=shipping');
  };

  const setMsgHandler = (variant = 'info', seconds = 2) => {
    setMsg({ ...msg, display: true, variant });
    setTimeout(() => {
      setMsg({ ...msg, display: false });
    }, seconds * 1000);
  };

  return (
    <>
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
                {cartItems.map((item, index) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    newQty={updatedQty.find((curr) => curr._id === item._id)}
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
                    <h4>Total price: ${calcs.totalPrice} </h4>
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
    </>
  );
};

export default CartScreen;
