import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { bookReducer } from './bookSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bookApi } from '../../features/books';

const store = configureStore({
  reducer: {
    bookStore: bookReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
