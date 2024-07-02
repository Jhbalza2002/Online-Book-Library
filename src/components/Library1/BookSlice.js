import { createSlice } from "@reduxjs/toolkit";
import { api } from '../../store/api';

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "/books",
        headers: {"Content-Type": "application/json"}
      }),
      providesTags: ["Books"],
    }),
  }),
});

const booksSlice = createSlice({
  name: "books",
  initialState: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getBooks.matchFulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
  },
});

export default booksSlice.reducer;

export const { useGetBooksQuery } = booksApi;