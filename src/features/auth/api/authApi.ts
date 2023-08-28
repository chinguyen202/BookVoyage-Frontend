import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    // Register user
    registerUser: builder.mutation({
      query: (payload) => ({
        url: `users/register`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    // Login
    loginUser: builder.mutation({
      query: (payload) => ({
        url: `auth/login`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
export default authApi;
