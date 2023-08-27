import { ChangeEvent, FormEvent, useState } from 'react';
import { Loading } from '../../../app/layout';
import { useGetAddressQuery } from '../../users/api/userApi';
import { calculateCartTotal, inputHelper, toastNotify } from '../../../utility';
import { CartItem, OrderCreateForm } from '../../../app/models';
import { useSelector } from 'react-redux';
import { RootState } from '../../../storage/redux/store';
import { useCreateOrderMutation } from '../../orders/api/orderApi';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  // Call the useGetAddressQuery hook
  const { data, isLoading } = useGetAddressQuery('UserAddress');
  console.log(data);
  // Get the cart
  const userCart: CartItem[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const [createOrder] = useCreateOrderMutation();
  const { totalItems, subtotal } = calculateCartTotal(userCart);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    fullName: data?.value?.fullName || '',
    street: data?.value?.street || '',
    postCode: data?.value?.postCode || '',
    state: data?.value?.state || '',
    country: data?.value?.country || '',
    saveAddress: false,
  });
  // Handle user input
  const handleUserInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  // Create the order
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    // Fill the form
    const userAddress: OrderCreateForm = {
      saveAddress: userInput.saveAddress,
      shippingAddress: {
        fullName: userInput.fullName,
        street: userInput.street,
        postCode: userInput.postCode,
        state: userInput.state,
        country: userInput.country,
      },
    };
    // Send the request to API
    const response = await createOrder(userAddress);
    if ('data' in response) {
      toastNotify('Order created');
      navigate('/order/orderConfirmed');
    } else {
      toastNotify('Error in creating the order', 'error');
    }
    setLoading(false);
  };
  if (isLoading || loading) return <Loading />;

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            {userCart.map((cartItem: CartItem, index: number) => (
              <ul className="list-group mb-3" key={index}>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{cartItem.book.title}</h6>
                    <small className="text-muted">
                      {cartItem.book.yearOfPublished}
                    </small>
                  </div>
                  <span className="text-muted">
                    ${(cartItem.quantity * cartItem.book.unitPrice).toFixed(2)}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${subtotal}</strong>
                </li>
              </ul>
            ))}
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Shipping address</h4>
            <form method="post" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={userInput.fullName}
                  onChange={handleUserInput}
                  placeholder="Receiver's name"
                  required
                />
                <div className="invalid-feedback">
                  Please enter your name for shipping.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="street" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  value={userInput.street}
                  onChange={handleUserInput}
                  placeholder="1234 Main St"
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    className="form-select d-block w-100"
                    name="country"
                    value={userInput.country}
                    onChange={handleUserInput}
                    required
                  >
                    <option value="">Choose...</option>
                    <option>Finland</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select
                    className="form-select d-block w-100"
                    name="state"
                    value={userInput.state}
                    onChange={handleUserInput}
                    required
                  >
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="postCode" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="postCode"
                    value={userInput.postCode}
                    onChange={handleUserInput}
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <hr className="mb-4" />

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="saveAddress"
                  checked={userInput.saveAddress}
                  onChange={handleUserInput}
                />
                <label className="form-check-label" htmlFor="saveAddress">
                  Save this information for next time
                </label>
              </div>

              <hr className="mb-4" />
              <button className="btn btn-dark px-4 rounded-pill" type="submit">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
