import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ActiveBookings from "./components/ActiveBookings";
import PreviousBookings from "./components/PreviousBookings";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

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
    labelStyle={{ fontSize: 14, textTransform: "capitalize" }}
    {...props}
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "white", marginHorizontal: 20, borderRadius: 8 }}
  />
);

export default function Bookings() {
  const layout = useWindowDimensions();
  const navigation = useNavigation()

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Active Bookings" },
    { key: "second", title: "Previous Bookings" },
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
        <Text style={tw`text-lg font-bold ml-2`}>Theresa Webb</Text>
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
