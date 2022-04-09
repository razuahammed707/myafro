import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Pending from "./userComponents/Pending";
import Previous from "./userComponents/Previous";
import Active from "./userComponents/Active";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  getBookingsByUser,
} from "../../../redux/slices/booking/bookingSlice";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <Pending />
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <Active />
  </View>
);

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <Previous />
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function UserBookings() {
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Pending" },
    { key: "second", title: "Active" },
    { key: "third", title: "Previous" },
  ]);

  const dispatch = useDispatch();
  const [assets, setAssets] = React.useState(null);
  // const { userBookings } = useSelector(bookingSelector);
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

  // console.log(userBookings);
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
        <Text style={tw`text-lg font-bold ml-2`}>Bookings</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => (
          <TabBar
            onTabPress={() => {
              assets !== null && dispatch(getBookingsByUser(assets));
            }}
            inactiveColor="black"
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
