import { Routes, Route } from 'react-router-dom';

import { Home, NotFound } from './index';
import { Footer, Header } from './components';
import { BookDetails } from '../../features/books';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCartsByUserIdQuery } from '../../features/shoppingCart/api/shoppingCartApi';
import { useEffect } from 'react';
import { setShoppingCart } from '../../storage/redux/shoppingCartSlice';
import { ShoppingCart } from '../../features/shoppingCart';
import { Login, Register } from '../../features/auth';
import { User } from '../models';
import { decodeJwtToken } from '../../utility';
import { setLoggedInUser } from '../../storage/redux/authSlice';
import { RootState } from '../../storage/redux/store';
import { Checkout } from '../../features/checkout';
import { MyOrders, OrderDetail } from '../../features/orders';

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authStore);
  const { data, isLoading } = useGetCartsByUserIdQuery(userData.id);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      const currentUser: User = decodeJwtToken(localToken);
      dispatch(setLoggedInUser(currentUser));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && data?.cartItems) {
      dispatch(setShoppingCart(data.cartItems));
    }
  }, [isLoading, dispatch, data]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/books/:bookId" element={<BookDetails />}></Route>
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/order/myOrders" element={<MyOrders />}></Route>
          <Route
            path="/order/orderDetail/:orderId"
            element={<OrderDetail />}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
