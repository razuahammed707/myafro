import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ActiveBookings from "./components/ActiveBookings";
import PreviousBookings from "./components/PreviousBookings";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Pending from "./userComponents/Pending";
import Previous from "./userComponents/Previous";
import Active from "./userComponents/Active";

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
  third: ThirdRoute
});

const renderTabBar = (props) => (
  <TabBar
    inactiveColor="black"
    activeColor="black"
    labelStyle={{ fontSize: 14, textTransform: "capitalize" }}
    {...props}
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "white", marginHorizontal: 20, borderRadius: 8 }}
  />
);

export default function UserBookings() {
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Pending" },
    { key: "second", title: "Active" },
    { key: "third", title: "Previous" },
  ]);

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
        renderTabBar={renderTabBar}
        style={{ backgroundColor: "white" }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
}
