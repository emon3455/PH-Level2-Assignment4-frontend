import { apiSlice } from '../app/apiSlice';
import type { IBorrow, IBorrowSummary } from '../../../types/borrow';

export const borrowApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<IBorrow, Partial<IBorrow>>({
      query: (data) => ({
        url: '/borrow',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Borrow', 'Books'],
    }),
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => '/borrow',
      providesTags: ['Borrow'],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowApiSlice;
