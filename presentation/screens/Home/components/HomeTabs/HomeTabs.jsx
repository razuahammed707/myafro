
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from "../../Home";
import { Icon } from "react-native-elements";
import Onboard from "../../../Onboard/Onboard";
import ProfileReview from "../../../ProfileReview/ProfileReview";
import Account from "../../../Account/Account";

const HomeTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator initialRouteName="Request" screenOptions={{
        headerShown:false
      }}>
        <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#222",
          tabBarStyle: {
            height: 60,
            paddingBottom:10
          }
        }} />
        <Tab.Screen name="Saloon" component={ProfileReview} options={{
          tabBarLabel: 'Saloon',
          tabBarIcon: ({ color, size }) => (
            <Icon name="wheelchair" type="fontisto" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#222",
          tabBarStyle: {
            height: 60,
            paddingBottom:10
          }
        }}/>
        <Tab.Screen name="Account" component={Account} options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#222",
          tabBarStyle: {
            height: 60,
            paddingBottom:10
          }
        }}/>
      </Tab.Navigator>
  );
};

export default HomeTabs;
