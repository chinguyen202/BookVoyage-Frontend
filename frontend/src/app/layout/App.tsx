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

const App = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetCartsByUserIdQuery(
    '858ae18a-fd9e-4125-bc32-5bf2d4c97475'
  );

  useEffect(() => {
    if (!isLoading) {
      console.log('DATA: ', data);
      dispatch(setShoppingCart(data.cartItems));
    }
  }, [data]);

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
