  
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
  createMessageToSend,
  getBookingsByUser,
  getCreateBookingData,
  getMessageToSend,
} from "../../../redux/slices/booking/bookingSlice";
import BookedSalon from "../Bookings/userComponents/BookedSalon";
import Loader from "../../components/Loader/Loader";
import {
  getCreateReviewData,
  reviewSelector,
} from "../../../redux/slices/reviews/reviewSlice";

const BookingConfirmation = () => {
  const navigation = useNavigation();
  const [sendMessage, setSendMessage] = useState("");
  const dispatch = useDispatch();
  const [assets, setAssets] = useState(null);
  // const [messageAssets, setMessageAssets] = useState(null);
  const {singleSalonId} = useSelector(userHomeSelector)
  const { isFetching, createdBooking, createBookingData } = useSelector(bookingSelector);

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

  useEffect(() => {
    dispatch(
      getCreateBookingData({
        ...createBookingData,
        starting_time: "16-2-2021",
        ending_time: "15-3-2022",
        salon: singleSalonId,
        message: sendMessage
      })
    );
  }, [sendMessage]);
  
  return (
    <SafeAreaView style={tw`p-5 mb-5`}>
      <View>
        <View style={tw`mb-10`}>
          <View style={tw`flex flex-row`}>
            <Icon
              name="arrow-left"
              type="feather"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
            />
            <Text style={tw`font-bold text-lg ml-2`}>Booking Confirmation</Text>
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
                <Text style={tw`font-bold text-lg mb-3 `}>Uploaded Images</Text>
              </View>

              {/* Message section start */}
              <Text style={tw`font-bold text-lg mb-3 mt-6 `}>
                Write Message
              </Text>
              <View
                style={{
                  backgroundColor: "lightgray",
                  borderBottomColor: "#000000",
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Type a message"
                  multiline={true}
                  onChangeText={(text) => setSendMessage(text)}
                  numberOfLines={4}
                />
              </View>
              {/* <View style={tw`mt-2 flex flex-row justify-end`}>
                <Button
                  title="Send"
                  buttonStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                  }}
                  type="clear"
                  icon={
                    <Icon
                      name="send"
                      type="feather"
                      size={20}
                      color="#fff"
                      style={tw`mr-2`}
                    />
                  }
                  iconPosition="left"
                  titleStyle={{ fontSize: 14 }}
                  onPress={() => dispatch(createMessageToSend(messageAssets))}
                />
              </View> */}
              <ResponsePopup bookingConfirmation="confirmation"/>
            </View>
          </ScrollView>
        </View>
      </View>
      <Loader loading={isFetching} />
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