import { CartItemList, CartSummary } from '../index';

const ShoppingCart = () => {
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

export default ShoppingCart;
