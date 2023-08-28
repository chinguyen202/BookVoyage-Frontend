import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../utility/constants';
import { getTokenFromLocalStorage } from '../../../utility/tokenHelper';

const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    // Get all book
    getBooks: builder.query({
      query: () => ({
        url: '/books',
      }),
      providesTags: ['Books'],
    }),
    // Get a book
    getBookById: builder.query({
      query: (id) => ({
        url: `books/${id}`,
      }),
      providesTags: ['Books'],
    }),
    // Create a book
    createBook: builder.mutation({
      query: (payload) => ({
        url: 'books',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        body: payload,
      }),
      invalidatesTags: ['Books'],
    }),
    // Update a book
    updateBook: builder.mutation({
      query: ({ data, id }) => ({
        url: `books/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        body: data,
      }),
      invalidatesTags: ['Books'],
    }),
    // Delete a book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
export default bookApi;
