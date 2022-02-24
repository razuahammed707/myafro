import { configureStore } from "@reduxjs/toolkit";
import loginReducer  from "./slices/loginSlice";
import signUpSlice from "./slices/signUpSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signUpSlice,
  },
});
