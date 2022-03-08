import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboard from "../screens/Onboard/Onboard";
import Profile from "../screens/Profile/Profile";
import ProfileDetails from "../screens/ProfileDetails/ProfileDetails";
import SaloonLocation from "../screens/SaloonLocation/SaloonLocation";
import SaloonOption from "../screens/SaloonOption/SaloonOption";
import ProfileReview from "../screens/ProfileReview/ProfileReview";
import FreelanceOnboard from "../screens/FreelanceOnboard/FreelanceOnboard";
import Bookings from "../screens/Bookings/Bookings";
import Request from "../screens/Request/Request";
import GoogleMap from "../screens/Map/GoogleMap";
import Tabs from "../components/Tabs/Tabs";
import HomeTabs from "../screens/Home/components/HomeTabs/HomeTabs";
import CurrentHair from "../screens/CurrentHair/CurrentHair";
import SalonProfile from "../screens/SalonProfile/SalonProfile";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
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
      </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
