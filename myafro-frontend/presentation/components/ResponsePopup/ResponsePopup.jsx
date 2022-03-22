import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Overlay, Icon, Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  createBooking,
  getCreateBookingData,
} from "../../../redux/slices/booking/bookingSlice";
import { userHomeSelector } from "../../../redux/slices/user/userHomeSlice";
import Loader from "../Loader/Loader";
import ReviewPopup from "../../screens/Bookings/userComponents/ReviewPopup";

const ResponsePopup = ({ bookingInfo }) => {
  const [visible, setVisible] = useState(false);
  const [assets, setAssets] = useState(null);
  const { isSuccess, createBookingData, isFetching } =
    useSelector(bookingSelector);
  const { singleSalonId } = useSelector(userHomeSelector);
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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

  useLayoutEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    dispatch(
      getCreateBookingData({
        ...createBookingData,
        starting_time: "16-2-2021",
        ending_time: "15-3-2022",
        salon: singleSalonId,
      })
    );
  }, [singleSalonId]);

  return (
    <View>
      <View style={tw`flex flex-row items-center justify-between my-3`}>
        <TouchableOpacity style={tw`flex flex-row items-center`}>
          <View style={tw`mt-10  w-full`}>
            {bookingInfo === undefined && bookingInfo !== "booked" && bookingInfo !== "pending" ? (
              <Button
                title="Confirm Booking"
                type="clear"
                titleStyle={{ marginLeft: 10 }}
                icon={
                  <Icon
                    name="dry-cleaning"
                    type="material"
                    size={20}
                    color="#fff"
                  />
                }
                iconPosition="left"
                onPress={() => {
                  dispatch(createBooking(assets));
                  toggleOverlay();
                }}
              />
            ) : bookingInfo === "pending" ? (
              <Button
                title="Cancel Booking"
                type="clear"
                buttonStyle={{
                  backgroundColor: "#444",
                }}
                titleStyle={{ marginLeft: 10 }}
                icon={
                  <Icon name="trash" type="feather" size={20} color="#fff" />
                }
                iconPosition="left"
                onPress={() => {
                  // dispatch(createBooking(assets));
                  toggleOverlay();
                }}
              />
            ) : bookingInfo === "booked" && bookingInfo !== undefined && (
               <ReviewPopup authToken={assets}/>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {isSuccess && !isFetching && (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={styles.container}>
            <Text style={styles.textPrimary}>Booking is placed successful</Text>
            <Icon name="check-circle" type="feather" size={40} color="green" />
          </View>
        </Overlay>
      )}
      <Loader loading={isFetching} />
    </View>
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
    fontSize: 25,
    color: "green",
    marginBottom: 20,
  },
});

export default ResponsePopup;
