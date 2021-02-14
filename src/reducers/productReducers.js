import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
} from "../types";

const initialState = {
  books: [],
  isLoading: false,
  message: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, ...action.payload, isLoading: true };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        books: [],
        message: "Error in fetching books, Please try after some times",
      };
    default:
      return { ...state };
  }
};

export default productReducer;
