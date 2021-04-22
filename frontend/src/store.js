import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as productReducers from './reducers/productReducers.js';
import * as cartReducers from './reducers/cartReducers.js';
import * as userReducers from './reducers/userReducers';
import * as orderReducers from './reducers/orderReducers';

//this is the root reducer that includes all reducers
const reducer = combineReducers({
  productList: productReducers.productListReducer,
  productDetails: productReducers.productDetailsReducer,
  productPrices: productReducers.productPriceReducer,
  cart: cartReducers.cartReducer,
  userLogin: userReducers.userLoginReducer,
  userRegister: userReducers.userRegisterReducer,
  userDetails: userReducers.userDetailsReducer,
  userDetailsUpdate: userReducers.updateUserDetailsReducer,
  orderReducers: orderReducers.orderCreateReducer,
  orderDetails: orderReducers.orderDetailsReducer,
  myOrders: orderReducers.myOrdersReducer,
});

//getting existing items from the LC
let cartItems = JSON.parse(localStorage.getItem('cartItems'));
let shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
let paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));

//this is the preloader that gets loaded in the build time
const initialState = {
  cart: {
    cartItems: cartItems || [],
    shippingAddress: shippingAddress || {},
    paymentMethod: paymentMethod || {},
  },
  userLogin: { userInfo: null },
};

//this is the list of middleware that are fired when an action is dispatched
const middleware = [thunk];
//thunk is a middleware that contacts with the server

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
