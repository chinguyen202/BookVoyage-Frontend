import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Home, NotFound } from './index';
import { Footer, Header } from './components';
import { AdminBookList, BookDetails, UpsertBook } from '../../features/books';
import { useGetCartsByUserQuery } from '../../features/shoppingCart/api/shoppingCartApi';
import { setShoppingCart } from '../../storage/redux/shoppingCartSlice';
import { Checkout, ShoppingCart } from '../../features/shoppingCart';
import { Login, Register } from '../../features/auth';
import { User } from '../models';
import { decodeJwtToken } from '../../utility';
import { setLoggedInUser } from '../../storage/redux/authSlice';
import {
  AllOrders,
  MyOrders,
  OrderConfirmed,
  OrderDetail,
} from '../../features/orders';
import { AllCategory, UpsertCategory } from '../../features/categories';
import { UpsertAuthor, AllAuthor } from '../../features/authors';

const App = () => {
  const dispatch = useDispatch();
  // Get user's shopping cart
  const { data, isLoading } = useGetCartsByUserQuery('ShoppingCarts');

  // Set current user by using Token
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      const currentUser: User = decodeJwtToken(localToken);
      dispatch(setLoggedInUser(currentUser));
    }
  }, [dispatch]);
  // Set user's logged in cart
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
          <Route path="/order/allOrders" element={<AllOrders />}></Route>
          <Route
            path="/order/orderDetail/:orderId"
            element={<OrderDetail />}
          ></Route>
          <Route
            path="/order/orderConfirmed"
            element={<OrderConfirmed />}
          ></Route>
          <Route path="/books/bookList" element={<AdminBookList />}></Route>
          <Route
            path="/books/bookUpsert/:bookId"
            element={<UpsertBook />}
          ></Route>
          <Route path="/books/bookUpsert" element={<UpsertBook />}></Route>
          <Route path="/categories" element={<AllCategory />}></Route>
          <Route
            path="/categories/upsert/:categoryId"
            element={<UpsertCategory />}
          ></Route>
          <Route path="/categories/upsert" element={<UpsertCategory />}></Route>
          <Route path="/authors" element={<AllAuthor />}></Route>
          <Route
            path="/authors/upsert/:authorId"
            element={<UpsertAuthor />}
          ></Route>
          <Route path="/authors/upsert" element={<UpsertAuthor />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
