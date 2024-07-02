import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../store/api";

const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "users/register",
        method: "POST",
        body: JSON.stringify(credentials),
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

const storeToken = (state, { payload }) => {
  state.token = payload.token;
  window.sessionStorage.setItem("Token", payload.token);
};

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: {},
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  },
});

export default registerSlice.reducer;
export const { useRegisterMutation } = registerApi;
