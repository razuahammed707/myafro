import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import ResponsePopup from "../../components/ResponsePopup/ResponsePopup";
import { userHomeSelector } from "../../../redux/slices/user/userHomeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  getBookingsByUser,
} from "../../../redux/slices/booking/bookingSlice";
import BookedSalon from "../Bookings/userComponents/BookedSalon";
import Loader from "../../components/Loader/Loader";
import { getCreateReviewData, reviewSelector } from "../../../redux/slices/reviews/reviewSlice";

const BookingConfirmation = () => {
  const navigation = useNavigation();
  const { singleSalonId } = useSelector(userHomeSelector);
  const {createReviewData} = useSelector(reviewSelector)
  const { userBookings, isSuccess, isFetching, message } = useSelector(bookingSelector);
  const [uniqueBooking, setUniqueBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const [assets, setAssets] = useState(null);

  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        setAssets({
          token: parsedToken?.access_token,
          role: parsedToken?.user?.user?.role,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const getSingleBooking = () => {
    const uniqueBooking = userBookings?.find(
      (booking) => booking._id && booking?.salon?._id === singleSalonId
    );
    setUniqueBooking({
      uniqueBooking,
      role: assets?.role,
      token: assets?.token,
    });
    setIsLoading(true)
  };

  useEffect(() => {
    assets !== null  && dispatch(getBookingsByUser(assets));
    if (userBookings?.length > 0) {
      getSingleBooking();
    }
  }, [assets]);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Do you want to decline the request?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            console.log("Request declined");
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  useEffect(() => {
    dispatch(
      getCreateReviewData({
        ...createReviewData,
        booking: uniqueBooking?.uniqueBooking?._id,
        salon: uniqueBooking?.uniqueBooking?.salon?._id,
      })
    );
  }, [uniqueBooking]);

  console.log(uniqueBooking)
  
  return (
    <SafeAreaView style={tw`p-5 mb-5`}>
        {isSuccess ? <View>
          {uniqueBooking !== null ? (
            <BookedSalon uniqueBooking={uniqueBooking} />
          ) : (
            <View style={tw`mb-10`}>
              <View style={tw`flex flex-row`}>
                <Icon
                  name="arrow-left"
                  type="feather"
                  size={28}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
                <Text style={tw`font-bold text-lg ml-2`}>
                  Booking Confirmation
                </Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={tw`my-5 flex`}>
                  <Image
                    style={{ width: "100%" }}
                    source={require("../../../assets/img/current.png")}
                  />
                  <View style={tw`my-5 flex flex-col justify-end items-end`}>
                    <Button
                      title="Upload"
                      buttonStyle={{
                        paddingHorizontal: 20,
                        paddingVertical: 16,
                        backgroundColor: "#4caf50",
                        //   width:"50%",
                      }}
                      type="clear"
                      icon={
                        <Icon
                          name="upload-cloud"
                          type="feather"
                          size={20}
                          color="#fff"
                          style={tw`ml-2`}
                        />
                      }
                      iconPosition="right"
                      titleStyle={{ fontSize: 14 }}
                    />
                    <Text style={tw`mt-2 ml-2 text-gray-400 text-sm `}>
                      Upload your current hair images
                    </Text>
                  </View>
                  <View style={tw`my-5`}>
                    <Text style={tw`font-bold text-lg mb-3 `}>
                      Uploaded Images
                    </Text>
                  </View>

                  {/* Message section start */}
                  <Text style={tw`font-bold text-lg mb-3 `}>Message</Text>
                  <View
                    style={{
                      backgroundColor: "#fff",
                      borderBottomColor: "#000000",
                    }}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Type a message"
                      multiline={true}
                      numberOfLines={4}
                    />
                  </View>
                  <ResponsePopup />
                </View>
              </ScrollView>
            </View>
          )}
        </View> : <Loader loading={isFetching} />}
        
    </SafeAreaView>
  );
};

export default BookingConfirmation;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
  },

  input: {
    margin: 12,
    padding: 10,
    borderRadius: 8,
  },
});
