
import { apiSlice } from '../app/apiSlice';
import type { IBook, IBookResponse } from '../../../types/book';

export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<IBookResponse, { page: number; limit: number }>({
            query: ({ page = 1, limit = 5 }) => `/books?page=${page}&limit=${limit}`,
            transformResponse: (response: any) => response.data,
            providesTags: ['Books'],
        }),
        getBookById: builder.query<IBook, string>({
            query: (id) => `/books/${id}`,
        }),
        createBook: builder.mutation<IBook, Partial<IBook>>({
            query: (book) => ({
                url: '/books',
                method: 'POST',
                body: book,
            }),
            invalidatesTags: ['Books'],
        }),
        updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Books'],
        }),
        deleteBook: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books'],
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApiSlice;
