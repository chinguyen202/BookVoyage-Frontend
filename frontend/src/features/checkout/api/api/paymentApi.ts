import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../../../utility';

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    // Init Payment
    initPayment: builder.mutation({
      query: (userId) => ({
        url: `payment`,
        method: 'POST',
        params: {
          userId: userId,
        },
      }),
    }),
  }),
});

export const { useInitPaymentMutation } = paymentApi;
export default paymentApi;
