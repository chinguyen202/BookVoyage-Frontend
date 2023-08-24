import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../app/models';
import { UserFormValues } from '../../app/models/user';

const initialState: UserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  password: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
