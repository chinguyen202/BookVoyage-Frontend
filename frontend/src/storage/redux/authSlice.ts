import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../app/models';

const initialState: User = {
  userName: '',
  id: '',
  email: '',
  role: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    // Reducer for setting the logged-in user's information
    setLoggedInUser: (state, action) => {
      state.userName = action.payload.userName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
