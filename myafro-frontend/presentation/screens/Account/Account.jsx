import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accountData1, accountData2 } from "../../../utils/dummyData";
import { ScrollView } from "react-native-gesture-handler";
import {
  authSelector,
  emptyLoggedInData,
  getTokenValue,
  reset,
} from "../../../redux/slices/login/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { bookingSelector, resetBooking } from "../../../redux/slices/booking/bookingSlice";
import { getDateTimes, getLocationInfo } from "../../../redux/slices/map/mapSlice";
import { resetSalon } from "../../../redux/slices/salon/salonSlice";

const Account = () => {
  const navigation = useNavigation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { token } = useSelector(authSelector);
  const dispatch = useDispatch();
  // const {resetBooking} = useSelector(bookingSelector)
  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedValue = JSON.parse(userInfo);
        setLoggedInUser(parsedValue?.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const logout = async () => {
   try {
    await AsyncStorage.getAllKeys()
    .then((keys) => AsyncStorage.multiRemove(keys))
    .then(() => {
     console.log('logout')
    });
    dispatch(getTokenValue(null));
    dispatch(emptyLoggedInData({}))
    dispatch(reset());
    dispatch(resetBooking())
    dispatch(resetSalon())
    dispatch(getLocationInfo({}))
   } catch (error) {
     console.log(error)
   }
  };


  return (
    <SafeAreaView style={tw`p-5 h-full`}>
      {/* <DateTimePickers /> */}
      <View style={tw`flex flex-row items-center`}>
        <Icon
          name="arrow-left"
          type="feather"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={tw`font-bold text-xl ml-2`}>Account</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Data one start  */}
        <View style={tw`mt-5`}>
          {accountData1.map((item) => (
            <View
              style={tw` mb-3 flex flex-row items-center justify-between border-gray-200 border-b-2 pb-3`}
              key={item.id}
            >
              <TouchableOpacity
                style={tw`flex flex-row items-center`}
                onPress={() =>
                  navigation.navigate(
                    item.link === "SalonProfile" &&
                      loggedInUser?.user?.role === "user"
                      ? "UserProfile"
                      : "SalonProfile"
                  )
                }
              >
                <Icon
                  name={item.icon_name}
                  type={item.icon_type}
                  size={20}
                  color="black"
                />
                <Text style={tw`ml-3 text-sm`}>{item.name}</Text>
              </TouchableOpacity>
              <Icon
                name="arrow-forward-ios"
                type="material"
                size={20}
                color="gray"
              />
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={tw` mb-3 flex flex-row items-center justify-between border-gray-200 border-b-2 pb-3`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Icon
              name="log-out"
              type="feather"
              size={20}
              color="black"
              onPress={() => navigation.navigate("Tabs")}
            />
            <Text style={tw`ml-3 text-sm`}>Switch to user mode</Text>
          </View>
          <Icon
            name="arrow-forward-ios"
            type="material"
            size={20}
            color="gray"
          />
        </TouchableOpacity>
        {/* Data one end  */}

        {/* Background image section start */}
        <View style={{ position: "relative", marginBottom: 20 }}>
          <Image
            style={{ width: "100%" }}
            source={require("../../../assets/img/accountbg.png")}
            resizeMode="cover"
          />
          <View style={tw`absolute top-5 w-full flex justify-center flex-row`}>
            <View>
              <Text style={tw`font-bold text-xl text-center`}>
                Own a Saloon
              </Text>
              <Text style={tw`text-sm`}>
                Earn up to $800 per month by sharing it{" "}
              </Text>
            </View>
          </View>
        </View>
        {/* Background image section end */}

        {/* Data two start  */}
        <View>
          {accountData2.map((item) => (
            <View
              style={tw` mb-3 flex flex-row items-center justify-between border-gray-200 border-b-2 pb-3`}
              key={item.id}
            >
              <View style={tw`flex flex-row items-center`}>
                <Icon
                  name={item.icon_name}
                  type={item.icon_type}
                  size={20}
                  color="black"
                />
                <Text style={tw`ml-3 text-sm`}>{item.name}</Text>
              </View>
              <Icon
                name="arrow-forward-ios"
                type="material"
                size={20}
                color="gray"
              />
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={tw` mb-3 flex flex-row items-center justify-between border-gray-200 border-b-2 pb-3`}
          onPress={() => {
            logout();
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <Icon name="log-out" type="feather" size={20} color="black" />
            <Text style={tw`ml-3 text-sm`}>Log Out</Text>
          </View>
          <Icon
            name="arrow-forward-ios"
            type="material"
            size={20}
            color="gray"
          />
        </TouchableOpacity>
        {/* Data two end  */}
      </ScrollView>
      {/* <BottomBar /> */}
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({});
