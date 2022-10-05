import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery, StrictEffect } from 'redux-saga/effects';
import { getCartFailed, getCartSuccess } from '../features/cart/cartSlice';

function* getCartFetch() {
  try {
    const response: AxiosResponse = yield call(() =>
      axios('https://course-api.com/react-useReducer-cart-project')
    );
    yield put(getCartSuccess(response.data));
  } catch (error) {
    yield put(getCartFailed());
    console.log(error);
  }
}

function* cartSaga(): Generator<StrictEffect> {
  yield takeEvery('cart/getCartRequest', getCartFetch);
}

export default cartSaga;
