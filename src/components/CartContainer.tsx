import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartRequest } from '../features/cart/cartSlice';
import { ICart } from '../interfaces/cart';
import { RootState } from '../store/store';
import CartItem from './CartItem';

function CartContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartRequest());
  }, [dispatch]);

  const { cartItems, total, amount } = useSelector(
    (state: RootState) => state.cart
  );

  if (amount < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>Your bag</h2>
          <h4 className='cart-empty'>is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className='cart'>
      <header>
        <h2>Your bag</h2>
      </header>
      <div>
        {cartItems.map((item: ICart) => {
          console.log('item: ', item);
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className='btn btn-clear'>Clear cart</button>
      </footer>
    </section>
  );
}

export default CartContainer;
