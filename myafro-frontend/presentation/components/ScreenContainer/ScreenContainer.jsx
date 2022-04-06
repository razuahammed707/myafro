import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Request from "../../screens/Request/Request";
import Bookings from "../../screens/Bookings/Bookings";
import FreelanceOnboard from "../../screens/FreelanceOnboard/FreelanceOnboard";
import ProfileReview from "../../screens/ProfileReview/ProfileReview";
import SaloonOption from "../../screens/SaloonOption/SaloonOption";
import SaloonLocation from "../../screens/SaloonLocation/SaloonLocation";
import CurrentHair from "../../screens/CurrentHair/CurrentHair";
import ProfileDetails from "../../screens/ProfileDetails/ProfileDetails";
import Profile from "../../screens/Profile/Profile";
import Onboard from "../../screens/Onboard/Onboard";
import Login from "../../screens/Login/Login";
import OneTimePass from "../../screens/OneTimePass/OneTimePass";
import ForgotPassword from "../../screens/ForgotPassword/ForgotPassword";
import ResetPassword from "../../screens/ResetPassword/ResetPassword";
import Signup from "../../screens/Signup/Signup";
import DateTimePicker from "../../screens/Home/components/DateTimePicker/DateTimePicker";
import Tabs from "../Tabs/Tabs";
import HomeTabs from "../../screens/Home/components/HomeTabs/HomeTabs";
import GoogleMap from "../../screens/Map/GoogleMap";
import CreatePassword from "../../screens/CreatePassword/CreatePassword";
import SalonProfile from "../../screens/SalonProfile/SalonProfile";
import UserProfile from "../../screens/UserProfile/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getTokenValue,
} from "../../../redux/slices/login/authSlice";
import BookingConfirmation from "../../screens/BookingConfirmation/BookingConfirmation";
import BookedSalon from "../../screens/Bookings/userComponents/BookedSalon";
import AppNavigator from "../../screenTypes/AppNavigator";
import AuthNavigator from "../../screenTypes/AuthNavigator";
import { useNavigation } from "@react-navigation/native";

const ScreenContainer = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(authSelector);

  // get token to make sure the user is authenticated or not
  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        dispatch(getTokenValue(parsedToken?.access_token));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getToken();
  }, []);
  const { data } = useSelector(authSelector);

  return token === null && !data?.access_token ? (
    <AuthNavigator />
  ) : (
    <AppNavigator data={data} />
  );
};

export default ScreenContainer;
