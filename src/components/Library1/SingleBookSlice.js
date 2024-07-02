import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../store/api";

const singleBookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBook: builder.query({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "GET",
      }),
      providesTags: ["Book"],
    }),
    bookCheckout: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "PATCH",
        body: {
          available: false,
        },
      }),
      invalidateTags: ["Book"],
    }),
  }),
});

const singleBookSlice = createSlice({
  name: "singleBook",
  initialState: {
    singleBook: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      singleBookApi.endpoints.getSingleBook.matchFulfilled,
      (state, { payload }) => {
        state.singleBook = payload;
        state.status = "succeeded";
        state.error = null;
      }
    );
    builder.addMatcher(
      singleBookApi.endpoints.getSingleBook.matchPending,
      (state) => {
        state.status = "loading";
      }
    );
    builder.addMatcher(
      singleBookApi.endpoints.getSingleBook.matchRejected,
      (state, { error }) => {
        state.status = "failed";
        state.error = error.message;
      }
    );
  },
});

export default singleBookSlice.reducer;
export const { useGetSingleBookQuery, useBookCheckoutMutation } = singleBookApi;
