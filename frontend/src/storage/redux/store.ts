import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { bookReducer } from './bookSlice';
import { bookApi } from '../../features/books';
import { shoppingCartApi } from '../../features/shoppingCart';
import { shoppingCartReducer } from './shoppingCartSlice';

const store = configureStore({
  reducer: {
    bookStore: bookReducer,
    shoppingCartStore: shoppingCartReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
      .concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
