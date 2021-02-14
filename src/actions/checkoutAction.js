import { OPEN_CHECKOUT, CLOSE_CHECKOUT } from "../types";

export const openCheckout = (data) => (dispatch) => {
  dispatch({ type: OPEN_CHECKOUT, payload: data });
};

export const closeCheckout = () => (dispatch) => {
  dispatch({ type: CLOSE_CHECKOUT });
};
