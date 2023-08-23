import React from 'react';
import CartSummary from '../components/CartSummary';

const ShoppingCart = () => {
  return (
    <div className="row w-100" style={{ marginTop: '10px' }}>
      <div className="col-lg-6 col-12" style={{ fontWeight: 500 }}>
        <CartSummary />
      </div>

      <div className="col-lg-6 col-12 p-4"> User details</div>
    </div>
  );
};

export default ShoppingCart;
