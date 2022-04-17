import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useLayoutEffect, useState } from "react";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileAccordion from "./components/ProfileAccordion";
import { Avatar, Button, Icon, Overlay } from "react-native-elements";
// import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  createSalon,
  getLoggedInUser,
  getSalon,
  salonSelector,
  updateSalon,
} from "../../../redux/slices/salon/salonSlice";
import Loader from "../../components/Loader/Loader";
import { authSelector, getTokenValue } from "../../../redux/slices/login/authSlice";
import { serviceSelector } from "../../../redux/slices/salon/serviceSlice";
import { useNavigation } from "@react-navigation/native";
import { getBookings } from "../../../redux/slices/booking/bookingSlice";

const SalonProfile = () => {
  // const [salonAssets, setSalonAssets] = useState({});
  const navigation = useNavigation();
  const { userData, hairDresserData, isFetching, isSuccess, message } =
    useSelector(salonSelector);
  const {data} = useSelector(authSelector)
  const { isFetchingService } = useSelector(serviceSelector);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // const getToken = async () => {
  //   try {
  //     const userInfo = await AsyncStorage.getItem("user_info");
  //     if (userInfo) {
  //       const parsedToken = JSON.parse(userInfo);
  //       console.log(parsedToken)
  //       setSalonAssets({
  //         token: parsedToken?.access_token,
  //         salonId: data?.salon?._id || hairDresserData?._id 
  //       });
      
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useLayoutEffect(() => {
    dispatch(getLoggedInUser(data?.user));
    dispatch(getTokenValue(data?.access_token));
  }, []);

  useEffect(() => {
    data?.access_token && dispatch(getSalon(data?.access_token));
  }, [isSuccess, isFetchingService, data?.access_token]);

  console.log(data?.salon?._id)

  // console.log(salonAssets)

  return (
    <>
      <SafeAreaView style={tw`h-full`}>
        <View
          style={tw`flex flex-row items-center justify-between px-5 py-4 border-b border-gray-200`}
        >
          <TouchableOpacity
            style={tw`flex flex-row items-center`}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" type="feather" size={20} color="black" />
            <Text style={tw`text-base font-bold ml-2`}>Back</Text>
          </TouchableOpacity>
          <Text style={tw`text-base font-bold`}>Profile</Text>
          {/* <Text
            style={tw`text-base font-bold`}
            onPress={() => dispatch(updateSalon(salonAssets))}
          >
            Save
          </Text> */}

          {hairDresserData?._id ? (
            <Button
              title="Save"
              type="clear"
              buttonStyle={{
                backgroundColor: "#444",
              }}
              titleStyle={{ marginLeft: 10 }}
              icon={
                <Icon name="edit-2" type="feather" size={20} color="#fff" />
              }
              iconPosition="left"
              onPress={() => {
                dispatch(updateSalon({token: data?.access_token, salonId: data?.salon?._id}));
                toggleOverlay();
               
              }}
            />
          ) : (
            <Button
              title="Create"
              type="clear"
              buttonStyle={{
                backgroundColor: "#444",
              }}
              titleStyle={{ marginLeft: 10 }}
              icon={
                <Icon name="edit-2" type="feather" size={20} color="#fff" />
              }
              iconPosition="left"
              onPress={() => {
                dispatch(createSalon({token: data?.access_token, salonId: data?.salon?._id}));
                toggleOverlay();
              }}
            />
          )}

          {isSuccess && !isFetching && (
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <View style={styles.container}>
                <Text style={styles.textPrimary}>
                  Profile is {hairDresserData?._id ? 'updated' : 'created'} successful
                </Text>
                <Icon
                  name="check-circle"
                  type="feather"
                  size={40}
                  color="green"
                />
              </View>
              <Button
                title="Close"
                type="clear"
                buttonStyle={{
                  backgroundColor: "green",
                }}
                titleStyle={{ marginLeft: 10 }}
                onPress={() => {
                  toggleOverlay();
                  dispatch(getBookings({token: data?.access_token, salonId: data?.salon?._id}));
                  navigation.navigate("Tabs");
                }}
              />
            </Overlay>
          )}
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
          <View >
            <ProfileAccordion />
          </View>
        </View>
      </SafeAreaView>
      {/* progress loader */}
      <Loader loading={isFetching} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 8,
  },
  textPrimary: {
    fontSize: 20,
    color: "green",
    marginBottom: 20,
  },
});

export default SalonProfile;
