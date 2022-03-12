import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useLayoutEffect, useState } from "react";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileAccordion from "./components/ProfileAccordion";
import { Avatar, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInUser,
  getSalon,
  salonSelector,
  updateSalon,
} from "../../../redux/slices/salon/salonSlice";
import Loader from "../../components/Loader/Loader";
import { getTokenValue } from "../../../redux/slices/login/authSlice";
import { serviceSelector } from "../../../redux/slices/salon/serviceSlice";

const SalonProfile = () => {
  const [salonAssets, setSalonAssets] = useState({});

  const { userData, updateSalonData, hairDresserData, isFetching, isSuccess } = useSelector(salonSelector);
  const { isFetchingService, isSuccessService } = useSelector(serviceSelector);
  const dispatch = useDispatch();

  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        setSalonAssets({
          token: parsedToken?.access_token,
          salonId: hairDresserData?._id,
          salonData: updateSalonData,
        });
        dispatch(getLoggedInUser(parsedToken?.user?.user));
        dispatch(getTokenValue(parsedToken?.access_token));
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(hairDresserData)

  useLayoutEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    salonAssets.token && dispatch(getSalon(salonAssets?.token))
  }, [isSuccess, isFetchingService])

  return (
    <>
      <SafeAreaView>
        <View
          style={tw`flex flex-row items-center justify-between px-5 py-4 border-b border-gray-200`}
        >
          <Text style={tw`text-base font-bold`}>Cancel</Text>
          <Text style={tw`text-base font-bold`}>Profile</Text>
          <Text
            style={tw`text-base font-bold`}
            onPress={() => dispatch(updateSalon(salonAssets))}
          >
            Save
          </Text>
        </View>
        <View style={tw`mb-5 h-full`}>
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
              <Text style={tw`text-base font-bold`}>{userData?.full_name}</Text>
              <Text style={tw` text-sm text-gray-500`}>{userData?.role}</Text>
            </View>
          </View>
          <ScrollView>
            <ProfileAccordion />
          </ScrollView>
        </View>
      </SafeAreaView>
       {/* progress loader */}
       <Loader loading={isFetching} />
    </>
  );
};

export default SalonProfile;
