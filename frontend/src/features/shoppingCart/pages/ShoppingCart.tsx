import { useSelector } from 'react-redux';

import { CartItemList, CartSummary } from '../index';
import { withAuth } from '../../../HOC';
import { CartItem } from '../../../app/models';
import { RootState } from '../../../storage/redux/store';

const ShoppingCart = () => {
  const shoppingCartFromStore: CartItem[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  if (shoppingCartFromStore.length === 0) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h4>Empty Shopping cart</h4>
      </div>
    );
  }

  return (
    <div className="row w-100" style={{ marginTop: '10px' }}>
      <div className="col-12">
        <CartItemList />
      </div>

      <div className="col-lg-6 col-12 p-4" style={{ fontWeight: 500 }}>
        <CartSummary />
      </div>
    </div>
  );
};

export default withAuth(ShoppingCart);
