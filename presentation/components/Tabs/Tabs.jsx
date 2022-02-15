import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Request from "../../screens/Request/Request";
import Login from "../../screens/Login/Login";
import Account from "../../screens/Account/Account";

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator initialRouteName="Request">
        <Tab.Screen name="Request" component={Request} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
