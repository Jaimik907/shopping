import axios, { AxiosResponse } from 'axios';
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { getUserFailed, getUserSuccess } from '../features/user/userSlice';

function* getUserFetch() {
  try {
    const response: AxiosResponse = yield call(() =>
      axios('https://course-api.com/react-useReducer-cart-project')
    );
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserFailed());
    console.log(error);
  }
}

function* userSaga(): Generator<StrictEffect> {
  yield takeEvery('cart/getUserRequest', getUserFetch);
}

export default userSaga;
