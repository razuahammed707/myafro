import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "react-native-modal-datetime-picker";
import CheckInDate from "./CheckInDate";
import CheckOutDate from "./CheckOutDate";

const FirstRoute = () => (
  <View style={{backgroundColor: "#fff", height:"100%" }}>
    <CheckInDate />
  </View>
);

const SecondRoute = () => (
  <View style={{backgroundColor: "#fff" }}>
    <CheckOutDate />
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
    style={{
      backgroundColor: "white",
      marginHorizontal: 20,
      marginVertical: 20,
      borderRadius: 8,
    }}
  />
);

export default function DateTabs() {
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Check in time" },
    { key: "second", title: "Check out time" },
  ]);

  return (
    <>
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
