import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../store/api";

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: JSON.stringify(credentials),
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

const storeToken = (state, { payload }) => {
  state.token = payload.token;
  state.user = payload.user;
  window.sessionStorage.setItem("Token", payload.token);
};

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
   builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    },
});

export default loginSlice.reducer;
export const { useLoginMutation } = loginApi;
