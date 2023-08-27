import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  book: [],
  search: '',
  categories: [],
  authors: [],
};

export const bookSlice = createSlice({
  name: 'Book',
  initialState: initialState,
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setAuthors: (state, action) => {
      state.authors = action.payload;
    },
  },
});

export const { setBook, setSearchItem, setAuthors, setCategories } =
  bookSlice.actions;
export const bookReducer = bookSlice.reducer;
