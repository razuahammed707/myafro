
   
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Overlay, Icon, Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  createBooking,
  getBookingsByUser,
  getCreateBookingData,
  getUpdateBookingData,
  updateBooking,
} from "../../../redux/slices/booking/bookingSlice";
import { userHomeSelector } from "../../../redux/slices/user/userHomeSlice";
import Loader from "../Loader/Loader";
import ReviewPopup from "../../screens/Bookings/userComponents/ReviewPopup";
import { useNavigation } from "@react-navigation/native";

const ResponsePopup = ({ bookingInfo, bookingConfirmation }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [assets, setAssets] = useState(null);
  const { isSuccess, isFetching } =
    useSelector(bookingSelector);
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
          bookingId: bookingInfo?._id,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getToken();
  }, []);

  // useEffect(() => {
  //   dispatch(
  //     getCreateBookingData({
  //       ...createBookingData,
  //       starting_time: "16-2-2021",
  //       ending_time: "15-3-2022",
  //       salon: singleSalonId,
  //     })
  //   );
  // }, [singleSalonId]);

  setTimeout(() => {
    visible === true && navigation.navigate("Home");
  }, 3000);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Do you want to cancel the booking request?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            dispatch(updateBooking(assets));
            dispatch(getBookingsByUser(assets))
            navigation.navigate("HomeTabs");
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
          onPress: () => {},
        },
      ]
    );
  };

  // console.log(createBookingData)

  return (
    <View style={tw`absolute bottom--2 left-5`}>
      <View style={tw`flex flex-row items-center justify-between my-3`}>
        <TouchableOpacity style={tw`flex flex-row items-center z-50`}>
          <View style={tw`w-full`}>
            {bookingInfo?.status === "pending" ? (
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
                  showConfirmDialog();
                  dispatch(
                    getUpdateBookingData({
                      status: "cancel",
                    })
                  );
                }}
              />
            ) : bookingConfirmation === "confirmation" ? (
              <Button
                title="Confirm Booking"
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
                  dispatch(createBooking(assets));
                  toggleOverlay();
                }}
              />
            ) : (
              bookingInfo?.status === "booked" &&
              bookingInfo?.status !== undefined && (
                <ReviewPopup authToken={assets} />
              )
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
          <Button
            title="Close"
            type="clear"
            buttonStyle={{
              backgroundColor: "green",
            }}
            titleStyle={{ marginLeft: 10 }}
            onPress={() => {
              toggleOverlay();
              dispatch(getBookingsByUser(assets))
            }}
          />
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
    fontSize: 20,
    color: "green",
    marginBottom: 20,
  },
});

export default ResponsePopup;