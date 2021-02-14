import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import productReducers from "./reducers/productReducers";
import cartReducers from "./reducers/cartReducers";
import checkoutReducer from "./reducers/checkoutReducer";
import rootSaga from "./sagas";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const middleWares = [thunk, sagaMiddleware];

const store = createStore(
  combineReducers({
    books: productReducers,
    cart: cartReducers,
    checkout: checkoutReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(...middleWares))
);

sagaMiddleware.run(rootSaga);

export default store;
