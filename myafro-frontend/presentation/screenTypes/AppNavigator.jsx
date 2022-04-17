import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import UserProfile from "../screens/UserProfile/UserProfile";
import BookingConfirmation from "../screens/BookingConfirmation/BookingConfirmation";
import BookedSalon from "../screens/Bookings/userComponents/BookedSalon";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getTokenValue } from "../../redux/slices/login/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentLocationInfo, getLocationInfo, mapSelector } from "../../redux/slices/map/mapSlice";
import MapAutocomplete from "../screens/Map/MapAutocomplete/MapAutocomplete";
import SalonMap from "../screens/Map/SalonMap";

const AppNavigator = ({ data }) => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  // const { locationInfo } = useSelector(mapSelector);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let name = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocation(location);
      dispatch(
        getCurrentLocationInfo({
          coordinates: location?.coords,
          name: name[0]?.city,
        })
      );
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(text)
  }

  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        if (parsedToken?.user?.user?.role === "hair_dresser") {
          navigation.navigate("Tabs");
        } else {
          navigation.navigate("HomeTabs");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getToken();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={
        data?.user?.role === "user"
          ? "HomeTabs"
          : data?.user?.role === "hair_dresser" &&
            data?.salon?._id &&
            data?.salon?.location?.coordinates === ""
          ? "SalonMap"
          : data?.user?.role === "hair_dresser" &&
            data?.salon?._id &&
            data?.salon?.location?.coordinates !== ""
          ? "Tabs"
          : data?.user?.role === "hair_dresser" &&
            !data?.salon?._id &&
            "FreelanceOnboard"
      }
    >
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
        name="SalonMap"
        component={SalonMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapAutocomplete"
        component={MapAutocomplete}
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
        name="BookedSalon"
        component={BookedSalon}
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
        name="UserProfile"
        component={UserProfile}
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
