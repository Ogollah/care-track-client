import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api";
import authReducer from "../features/auth/authSlice";

export const Store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
