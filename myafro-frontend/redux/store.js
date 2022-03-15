import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/login/authSlice";
import salonReducer from "./slices/salon/salonSlice";
import serviceReducer from "./slices/salon/serviceSlice";
import userHomeReducer from "./slices/user/userHomeSlice";
import userProfileReducer from "./slices/user/userProfileSlice";
import bookingReducer from "./slices/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    salon: salonReducer,
    salonService: serviceReducer,
    userHome: userHomeReducer,
    userProfile: userProfileReducer,
    booking: bookingReducer
  },
});
