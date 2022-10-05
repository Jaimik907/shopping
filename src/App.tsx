import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar';
import { calculateTotals } from './features/cart/cartSlice';
import { RootState } from './store/store';

function App() {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch])

  return (
    <div className='App'>
      <Navbar />
      <CartContainer />
    </div>
  );
}

export default App;
