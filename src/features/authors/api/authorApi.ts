import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../../../utility/tokenHelper';

const authorApi = createApi({
  reducerPath: 'authorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['Authors'],
  endpoints: (builder) => ({
    //Get all authors
    getAuthors: builder.query({
      query: () => ({
        url: '/authors',
      }),
      providesTags: ['Authors'],
    }),
    // Get a author by id
    getAuthorById: builder.query({
      query: (id) => ({
        url: `authors/${id}`,
      }),
      providesTags: ['Authors'],
    }),
    // Create an author
    createAuthor: builder.mutation({
      query: (payload) => ({
        url: 'authors',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        invalidatesTags: ['Authors'],
      }),
    }),
    // Update author
    updateAuthor: builder.mutation({
      query: (payload) => ({
        url: `authors/${payload.id}`,
        method: 'PUT',
        body: payload.name,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        invalidatesTags: ['Authors'],
      }),
    }),
    // Delete author
    deleteAuthor: builder.mutation({
      query: (id) => ({
        url: `authors/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        invalidatesTags: ['Authors'],
      }),
    }),
  }),
});

export const {
  useGetAuthorsQuery,
  useGetAuthorByIdQuery,
  useCreateAuthorMutation,
  useDeleteAuthorMutation,
  useUpdateAuthorMutation,
} = authorApi;
export default authorApi;
