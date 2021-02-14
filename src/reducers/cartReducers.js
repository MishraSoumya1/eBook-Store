import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../types";

const initialState = {
  cartItems: [],
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, ...action.payload };
    case REMOVE_FROM_CART:
      return { ...state, ...action.payload };
    case CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      return { ...state };
  }
};

export default cartReducers;
