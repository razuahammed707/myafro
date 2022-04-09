import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActiveBookings from "./components/ActiveBookings";
import PreviousBookings from "./components/PreviousBookings";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  getBookings,
} from "../../../redux/slices/booking/bookingSlice";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <ActiveBookings />
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <PreviousBookings />
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function Bookings() {
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Active Bookings" },
    { key: "second", title: "Previous Bookings" },
  ]);

  const dispatch = useDispatch();
  const [assets, setAssets] = React.useState(null);
  // const { bookings } = useSelector(bookingSelector);
  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        setAssets({
          token: parsedToken?.access_token,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <View style={tw`mt-8 px-5 pt-4 pb-5 bg-white flex flex-row`}>
        <Icon
          name="arrow-left"
          type="feather"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={tw`text-lg font-bold ml-2`}>Theresa Webb</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => (
          <TabBar
            inactiveColor="black"
            onTabPress={() => {
              assets !== null && dispatch(getBookings(assets));
            }}
            activeColor="black"
            labelStyle={{ fontSize: 14, textTransform: "capitalize" }}
            {...props}
            indicatorStyle={{ backgroundColor: "black" }}
            style={{
              backgroundColor: "white",
              marginHorizontal: 20,
              borderRadius: 8,
            }}
          />
        )}
        style={{ backgroundColor: "white" }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
}
