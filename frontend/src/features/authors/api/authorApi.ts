import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../utility';

const authorApi = createApi({
  reducerPath: 'authorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
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
    // Create a author
    createAuthor: builder.mutation({
      query: () => ({
        url: '/authors',
        method: 'POST',
      }),
    }),
    // Update a author
    // Delete a author
  }),
});

export const {
  useGetAuthorsQuery,
  useGetAuthorByIdQuery,
  useCreateAuthorMutation,
} = authorApi;
export default authorApi;
