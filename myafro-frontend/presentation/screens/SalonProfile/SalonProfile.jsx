import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect, useState } from "react";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileAccordion from "./components/ProfileAccordion";
import { Avatar, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  createSalon,
  getSalon,
  salonSelector,
} from "../../../redux/slices/salon/salonSlice";

const SalonProfile = () => {
  const [token, setToken] = useState(null);

  const { data, getSalonData, isSuccess, createdSalon} = useSelector(salonSelector);
 const dispatch = useDispatch()

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("user_info");
      if (value) {
        const parsedValue = JSON.parse(value);
        setToken(parsedValue.access_token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getToken();
    if (token !== null) dispatch(getSalon(token));
  }, [isSuccess]);

  // console.log(getSalonData)

  return (
    <>
      {isSuccess ? (
        <SafeAreaView>
          <View
            style={tw`flex flex-row items-center justify-between px-5 py-4 border-b border-gray-200`}
          >
            <Text style={tw`text-base font-bold`}>Cancel</Text>
            <Text style={tw`text-base font-bold`}>Profile</Text>
            <Text style={tw`text-base font-bold`} onPress={() => token !== null && dispatch(createSalon(token, getSalonData))}>Save</Text>
          </View>
          <ScrollView style={tw`mb-5 h-full`}>
            <View
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "row",
                position: "relative",
              }}
            >
              <Avatar
                size={64}
                rounded
                source={require("../../../assets/img/1.png")}
              />
              <View style={tw`absolute bottom-6 z-10 left-15`}>
                <Icon name="edit-2" type="feather" size={16} color="white" />
              </View>
              <View style={tw`ml-4`}>
                <Text style={tw`text-base font-bold`}>{data?.salon?.user.full_name}</Text>
                <Text style={tw` text-sm text-gray-500`}>
                  {data?.salon?.user.role}
                </Text>
              </View>
            </View>
            <ProfileAccordion />
          </ScrollView>
        </SafeAreaView>
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

export default SalonProfile;
