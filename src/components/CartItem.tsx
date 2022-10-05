import { useDispatch } from 'react-redux';
import { decrease, increase, removeItem } from '../features/cart/cartSlice';
import { ChevronDown, ChevronUp } from '../icons/icons';
import { ICart } from '../interfaces/cart';
import { RootDispatch } from '../store/store';

interface ICartItemProps extends ICart {}

function CartItem({ id, img, title, price, amount }: ICartItemProps) {
  const dispatch = useDispatch<RootDispatch>();

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4 className='item-price'>${price}</h4>
        <button
          className='remove-btn'
          onClick={() => {
            dispatch(removeItem(id));
          }}
        >
          Remove
        </button>
      </div>
      <div>
        <button
          className='amount-btn'
          onClick={() => dispatch(increase({ id }))}
        >
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button
          className='amount-btn'
          onClick={() => {
            if (amount === 0) {
              dispatch(decrease({ id }));
              return;
            }
            dispatch(decrease({ id }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
}

export default CartItem;
