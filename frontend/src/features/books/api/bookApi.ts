import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../utility/constants';

const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: '/books',
      }),
      providesTags: ['Books'],
    }),
    getBookById: builder.query({
      query: (id) => ({
        url: `books/${id}`,
      }),
      providesTags: ['Books'],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = bookApi;
export default bookApi;
