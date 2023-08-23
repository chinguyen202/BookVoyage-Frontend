import { useSelector } from 'react-redux';
import { RootState } from '../../../storage/redux/store';
import { CartItem } from '../../../app/models';
import { FormEvent, useState } from 'react';
import { MiniLoader } from '../../../app/layout';

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const shoppingCartFromStore: CartItem[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  let subtotal = 0;
  let totalItems = 0;

  shoppingCartFromStore?.map((cartItem: CartItem) => {
    totalItems += cartItem.quantity ?? 0;
    subtotal += (cartItem.book?.unitPrice ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="border pb-5 pt-3">
      <div className="form-group mt-3">
        <div className="card p-3" style={{ background: 'ghostwhite' }}>
          <h5>Total price : ${subtotal.toFixed(2)}</h5>
          <h5>No. items : {totalItems}</h5>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
          disabled={loading}
        >
          {loading ? <MiniLoader /> : 'Place order'}
        </button>
      </form>
    </div>
  );
};

export default CartSummary;
