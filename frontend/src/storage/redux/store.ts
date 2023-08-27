import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { bookReducer } from './bookSlice';
import { bookApi } from '../../features/books';
import { shoppingCartApi } from '../../features/shoppingCart';
import { shoppingCartReducer } from './shoppingCartSlice';
import { authApi } from '../../features/auth';
import { authReducer } from './authSlice';
import { orderApi } from '../../features/orders';
import { userApi } from '../../features/users';

const store = configureStore({
  reducer: {
    bookStore: bookReducer,
    authStore: authReducer,
    shoppingCartStore: shoppingCartReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
      .concat(shoppingCartApi.middleware)
      .concat(authApi.middleware)
      .concat(orderApi.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
