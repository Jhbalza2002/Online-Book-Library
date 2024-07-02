import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";


export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.register?.token|| getState().login.token;
      const sessionToken = window.sessionStorage.getItem("Token");
      if (token||sessionToken) {
        headers.set("authorization", `Bearer ${token ||sessionToken}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: ["Books"],
  endpoints: () => ({}),
});

