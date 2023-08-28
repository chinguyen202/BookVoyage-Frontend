import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../../storage/redux/store';
import { CartItem } from '../../../app/models';
import { calculateCartTotal } from '../../../utility';

const CartSummary = () => {
  const navigate = useNavigate();
  const shoppingCartFromStore: CartItem[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const { totalItems, subtotal } = calculateCartTotal(shoppingCartFromStore);

  return (
    <div className="border pb-5 pt-3">
      <div className="form-group mt-3">
        <div className="card p-3" style={{ background: 'ghostwhite' }}>
          <h5>Total price : ${subtotal.toFixed(2)}</h5>
          <h5>No. items : {totalItems}</h5>
        </div>
      </div>
      <button
        className="btn btn-lg btn-dark form-control mt-3"
        onClick={() => navigate('/checkout')}
      >
        Go to checkout
      </button>
    </div>
  );
};

export default CartSummary;
