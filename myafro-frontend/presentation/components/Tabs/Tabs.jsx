import { ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Request from "../../screens/Request/Request";
import Account from "../../screens/Account/Account";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Bookings from "../../screens/Bookings/Bookings";

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  return (
    <>
      {show ? (
        <Tab.Navigator
          initialRouteName="Request"
          screenOptions={{
            headerShown: false,
          }}
          
        >
          <Tab.Screen
            name="Request"
            component={Request}
            options={{
              tabBarLabel: "Request",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              tabBarActiveTintColor: "#222",
              tabBarStyle: {
                height: 60,
                paddingBottom: 10,
              },
            }}
          />
          <Tab.Screen
            name="Bookings"
            component={Bookings}
            options={{
              tabBarLabel: "Bookings",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="book" color={color} size={size} />
              ),
              tabBarActiveTintColor: "#222",
              tabBarStyle: {
                height: 60,
                paddingBottom: 10,
              },
            }}
          />
          <Tab.Screen
            name="Account"
            component={Account}
            options={{
              tabBarLabel: "Account",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="user" color={color} size={size} />
              ),
              tabBarActiveTintColor: "#222",
              tabBarStyle: {
                height: 60,
                paddingBottom: 10,
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <ActivityIndicator
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
          size={50}
          color="#ffa500"
        />
      )}
    </>
  );
};

export default Tabs;
