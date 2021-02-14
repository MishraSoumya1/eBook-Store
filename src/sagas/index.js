import { put, call, all, takeEvery } from "redux-saga/effects";
import { setBooks, setError } from "../actions/productActions";
import { fetchProducts } from "../api";
import { FETCH_PRODUCTS_REQUEST } from "../types";

function* handleBooksRequest() {
  try {
    const res = yield call(fetchProducts);
    yield put(setBooks(res));
  } catch (e) {
    yield put(setError());
  }
}

function* watchBooksLoad() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, handleBooksRequest);
}

export default function* rootSaga() {
  yield all([watchBooksLoad()]);
}
