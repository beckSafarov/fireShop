import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems } from '../actions/cartActions';
import axios from 'axios';

const CartChecker = () => {
  const dispatch = useDispatch();
  const cancelTokenSource = axios.CancelToken.source();
  const [cartItemsExist, setCartItemsExist] = useState(null);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (cartItems.length === 0) dispatch(getAllCartItems());

    if (cart.success) {
      cartItems.length === 0
        ? setCartItemsExist(false)
        : setCartItemsExist(true);
    }

    return () => cancelTokenSource.cancel();
  }, [dispatch, cart.success]);

  return {
    loading: cartItemsExist === null ? true : false,
    haveItems: cartItemsExist,
  };
};

export default CartChecker;
