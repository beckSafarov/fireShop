import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//this is the root reducer that includes all reducers
const reducer = combineReducers({});

//this is the preloader that gets loaded in the build time
const initialState = {};

//this is the list of middleware that are fired when an action is dispatched
const middleware = [thunk];
//thunk is a middleware that contacts with the server

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
