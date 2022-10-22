import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useAuth } from './context/authProvider';
import { calculateTotals } from './features/cart/cartSlice';
import AppRouting from './routes/routing';
import { RootState } from './store/store';

function App() {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return <AppRouting />;
}

export default App;
