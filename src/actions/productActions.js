import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
} from "../types";

export const loadBooks = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const setBooks = (books) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: books,
});

export const setError = () => ({
  type: FETCH_PRODUCTS_FAIL,
});
