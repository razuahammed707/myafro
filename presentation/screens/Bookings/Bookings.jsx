import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BottomBar from "../../components/BottomBar/BottomBar";
import ActiveBookings from "./components/ActiveBookings";
import PreviousBookings from "./components/PreviousBookings";

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

const renderTabBar = (props) => (
  <TabBar
    inactiveColor="black"
    activeColor="black"
    {...props}
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "white", marginHorizontal: 20, borderRadius: 8 }}
  />
);

export default function Bookings() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Active Bookings" },
    { key: "second", title: "Previous Bookings" },
  ]);

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        style={{ paddingTop: 40, backgroundColor: "white" }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <BottomBar name1="Request" name2="Bookings" name3="Account"/>
    </>
  );
}
