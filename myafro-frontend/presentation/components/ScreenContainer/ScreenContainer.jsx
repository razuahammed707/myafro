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
import { useDispatch } from "react-redux";
import { getTokenValue } from "../../../redux/slices/login/authSlice";
import BookingConfirmation from "../../screens/BookingConfirmation/BookingConfirmation";

const ScreenContainer = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch()
  // get token to make sure the user is authenticated or not
  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
       dispatch(getTokenValue(parsedToken?.access_token))
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getToken();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={OneTimePass}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePassword"
        component={CreatePassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={GoogleMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Request"
        component={Request}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bookings"
        component={Bookings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FreelanceOnboard"
        component={FreelanceOnboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileReview"
        component={ProfileReview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SaloonOption"
        component={SaloonOption}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SalonProfile"
        component={SalonProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SaloonLocation"
        component={SaloonLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CurrentHair"
        component={CurrentHair}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboard"
        component={Onboard}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DateTime"
        component={DateTimePicker}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ScreenContainer;
