import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  let alreadyExists = false;
  const cartItems = getState().cart.cartItems.slice();
  cartItems.forEach((x) => {
    if (x.name === product.name) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let newArr = [];
  cartItems.forEach((x) => {
    if (x.name === product.name) {
      x.count--;
    }
  });

  for (let item of cartItems) {
    if (item.count !== 0) {
      newArr.push(item);
    }
  }

  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems: newArr } });
};

export const clearCart = () => (dispatch) => dispatch({ type: CLEAR_CART });
