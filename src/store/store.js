import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import bookReducer from "../components/Library1/BookSlice";
import registerReducer from "../components/User/RegisterSlice"
import loginReducer from "../components/User/LoginSlice"
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, 
    book: bookReducer,
    register: registerReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
