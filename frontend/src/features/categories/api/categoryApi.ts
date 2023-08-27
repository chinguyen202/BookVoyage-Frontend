import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../utility/constants';

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    //Get all categories
    getCategories: builder.query({
      query: () => ({
        url: '/categories',
      }),
      providesTags: ['Categories'],
    }),
    // Get a category by id
    getCategoryById: builder.query({
      query: (id) => ({
        url: `categories/${id}`,
      }),
      providesTags: ['Categories'],
    }),
    // Create a category
    // Update a category
    // Delete a category
  }),
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
export default categoryApi;
