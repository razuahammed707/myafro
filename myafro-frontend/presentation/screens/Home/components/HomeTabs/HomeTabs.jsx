import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Home from "../../Home";
import Account from "../../../Account/Account";
import { ActivityIndicator, Image, Text } from "react-native";
import UserBookings from "../../../Bookings/UserBookings";

const HomeTabs = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  const Tab = createBottomTabNavigator();
  return (
    <>
      {show ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
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
            name="UserBookings"
            component={UserBookings}
            options={{
              tabBarLabel: "Bookings",
              tabBarIcon: ({ color, size }) => (
                // <Icon
                //   name="wheelchair"
                //   type="fontisto"
                //   size={size}
                //   color={color}
                // />
                <Image
                  source={require("../../../../../assets/img/salonIcon.png")}
                  width={24}
                  height={20}
                />
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

export default HomeTabs;
