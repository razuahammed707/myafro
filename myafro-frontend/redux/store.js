import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/login/authSlice";
import salonReducer from "./slices/salon/salonSlice";
import serviceReducer from "./slices/salon/serviceSlice";
import mediaReducer from "./slices/salon/mediaSlice";
import userHomeReducer from "./slices/user/userHomeSlice";
import userProfileReducer from "./slices/user/userProfileSlice";
import bookingReducer from "./slices/booking/bookingSlice";
import reviewReducer from "./slices/reviews/reviewSlice";
import mapReducer from "./slices/map/mapSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    salon: salonReducer,
    salonService: serviceReducer,
    salonMedia: mediaReducer,
    userHome: userHomeReducer,
    map: mapReducer,
    userProfile: userProfileReducer,
    booking: bookingReducer,
    reviews: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
