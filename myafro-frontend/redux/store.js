import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/login/authSlice";
// import loginReducer  from "./slices/loginSlice";
// import signUpSlice from "./slices/signUpSlice";

export const store = configureStore({
  reducer: {
    // login: loginReducer,
    // signup: signUpSlice,
    auth:authReducer
  },
});
