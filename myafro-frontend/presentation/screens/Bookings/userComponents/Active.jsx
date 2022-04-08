import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import UserBooking from "./UserBooking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { getBookingsByUser } from "../../../../redux/slices/booking/bookingSlice";

const Active = () => {
  const dispatch = useDispatch();
  const [assets, setAssets] = useState(null);

  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        setAssets({
          token: parsedToken?.access_token,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
    assets !== null && dispatch(getBookingsByUser(assets));
  }, []);
  
  // useEffect(() => {
  //   assets !== null && dispatch(getBookingsByUser(assets));
  // }, [assets]);

  console.log('active')
  return (
    <TouchableOpacity style={tw`px-5 h-full`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Booking /> */}
        <UserBooking booked="booked"/>
      </ScrollView>
    </TouchableOpacity>
  );
};

export default Active;

const styles = StyleSheet.create({});
