import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/login/authSlice";
import salonReducer from "./slices/salon/salonSlice";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    salon: salonReducer
  },
});
