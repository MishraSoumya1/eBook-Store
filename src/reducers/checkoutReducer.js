import { OPEN_CHECKOUT, CLOSE_CHECKOUT } from "../types";

const initialState = {
  isCheckoutOpen: false,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CHECKOUT:
      return { ...state, isCheckoutOpen: true, ...action.payload };
    case CLOSE_CHECKOUT:
      return { ...state, isCheckoutOpen: false };
    default:
      return { ...state };
  }
};

export default checkoutReducer;
