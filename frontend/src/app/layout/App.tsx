import { Routes, Route } from 'react-router-dom';

import { Home, NotFound } from './index';
import { Footer, Header } from './components';
import { BookDetails } from '../../features/books';
import { useDispatch } from 'react-redux';
import { useGetCartsByUserIdQuery } from '../../features/shoppingCart/api/shoppingCartApi';
import { useEffect } from 'react';
import { setShoppingCart } from '../../storage/redux/shoppingCartSlice';
import { ShoppingCart } from '../../features/shoppingCart';
import { Login, Register } from '../../features/auth';
import { User } from '../models';
import { decodeJwtToken } from '../../utility';
import { setLoggedInUser } from '../../storage/redux/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetCartsByUserIdQuery(
    '858ae18a-fd9e-4125-bc32-5bf2d4c97475'
  );

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      const currentUser: User = decodeJwtToken(localToken);
      dispatch(setLoggedInUser(currentUser));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.cartItems));
    }
  }, [data, isLoading, dispatch]);

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
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
