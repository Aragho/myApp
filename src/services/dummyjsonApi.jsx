import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dummyjsonApi = createApi({
  reducerPath: 'dummyjsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products/' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '',
    }),

    getProductsByCategory: builder.query({
      query: (category) => `category/${category}`,
    }),

    getProductsSearch: builder.query({
      query: (searchTerm) => `search?q=${searchTerm}`,
    }),
  }),
});

export const { 
  useGetAllProductsQuery, 
  useGetProductsByCategoryQuery, 
  useGetProductsSearchQuery
} = dummyjsonApi;
