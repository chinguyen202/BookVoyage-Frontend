import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  book: [],
  search: '',
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
  },
});

export const { setBook, setSearchItem } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
