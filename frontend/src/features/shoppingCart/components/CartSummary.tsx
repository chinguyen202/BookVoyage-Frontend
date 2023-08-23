import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from '../../../app/models';
import { RootState } from '../../../storage/redux/store';
import {
  removeCartItem,
  updateQuantity,
} from '../../../storage/redux/shoppingCartSlice';
import { useUpsertShoppingCartMutation } from '../api/shoppingCartApi';

const CartSummary = () => {
  const dispatch = useDispatch();
  const [updateShoppingCart] = useUpsertShoppingCartMutation();
  const shoppingCartFromStore: CartItem[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  if (!shoppingCartFromStore) {
    return <div>Shopping cart is empty</div>;
  }

  const handleQuantity = (updateQuantityBy: number, cartItem: CartItem) => {
    if (
      (updateQuantityBy === -1 && cartItem.quantity === 1) ||
      updateQuantityBy === 0
    ) {
      // Update to server
      updateShoppingCart({
        buyerId: '858ae18a-fd9e-4125-bc32-5bf2d4c97475',
        bookId: cartItem.bookId,
        quantity: 0,
      });
      // Remove the item from shopping cart in redux
      dispatch(removeCartItem({ cartItem, quantity: 0 }));
    } else {
      // Update to server
      updateShoppingCart({
        buyerId: '858ae18a-fd9e-4125-bc32-5bf2d4c97475',
        bookId: cartItem.bookId,
        quantity: updateQuantityBy,
      });
      // Update the quantity
      dispatch(
        updateQuantity({
          cartItem,
          quantity: cartItem.quantity + updateQuantityBy,
        })
      );
    }
  };

  return (
    <div className="container p-4 m-2">
      <h4 className="text-center">Cart Summary</h4>

      {shoppingCartFromStore.map((cartItem: CartItem, index: number) => (
        <div
          key={index}
          className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
          style={{ background: 'ghostwhite' }}
        >
          <div className="p-3">
            <img
              src={cartItem.book.imageUrl}
              alt={cartItem.book.title}
              width={'120px'}
            />
          </div>
          <div className="p-2 mx-3" style={{ width: '100%' }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ fontWeight: 300 }}>{cartItem.book.title}</h4>
              <h4>
                ${(cartItem.quantity * cartItem.book.unitPrice).toFixed(2)}
              </h4>
            </div>
            <div className="flex-fill">
              <h4 className="text-danger">{cartItem.book.unitPrice}</h4>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow"
                style={{ width: '100px', height: '43px' }}
              >
                <span style={{ color: '#161616' }} role="button">
                  <i
                    className="bi bi-dash-circle-fill"
                    onClick={() => handleQuantity(-1, cartItem)}
                  ></i>
                </span>
                <span>
                  <b>{cartItem.quantity}</b>
                </span>
                <span style={{ color: '#161616' }} role="button">
                  <i
                    className="bi bi-plus-circle-fill"
                    onClick={() => handleQuantity(1, cartItem)}
                  ></i>
                </span>
              </div>
              <button
                className="btn btn-danger mx-1"
                onClick={() => handleQuantity(0, cartItem)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSummary;
