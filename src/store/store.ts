import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import cartSlice from '../features/cart/cartSlice';
import cartSaga from '../sagas/cart';

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  middleware: [saga],
});
saga.run(cartSaga);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
