import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from '../../../utility/tokenHelper';

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
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
    createCategory: builder.mutation({
      query: (payload) => ({
        url: 'categories',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        invalidatesTags: ['Categories'],
      }),
    }),
    // Update a category
    updateCategory: builder.mutation({
      query: (payload) => ({
        url: `categories/${payload.id}`,
        method: 'PUT',
        body: payload.name,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        invalidatesTags: ['Categories'],
      }),
    }),
    // Delete a category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        invalidatesTags: ['Categories'],
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
export default categoryApi;
