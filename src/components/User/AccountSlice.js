import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../store/api";

const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccountDetails: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      invalidateTags: ["Books"],
    }),
    returnBook: builder.mutation({
        query: (reservationId) => ({
          url: `/reservations/${reservationId}`,
          method: "DELETE",
        }),
        invalidateTags: ['Books'],
      })
    }),
  });

const accountSlice = createSlice({
  name: "account",
  initialState: {
    user: {},
    checkedOutBooks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(accountApi.endpoints.getAccountDetails.matchFulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.checkedOutBooks = payload.checkedOutBooks;
        state.status = "succeeded";
      })
      .addMatcher(accountApi.endpoints.getAccountDetails.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(accountApi.endpoints.getAccountDetails.matchRejected, (state, { error }) => {
        state.status = "failed";
        state.error = error;
      });
  },
});

export default accountSlice.reducer;
export const { useGetAccountDetailsQuery, useReturnBookMutation, } = accountApi;
