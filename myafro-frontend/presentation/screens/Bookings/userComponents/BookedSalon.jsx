import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ResponsePopup from "../../../components/ResponsePopup/ResponsePopup";
import { Button, Icon } from "react-native-elements";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  createMessageToSend,
  getBookingsByUser,
  getMessages,
  getMessageToSend,
} from "../../../../redux/slices/booking/bookingSlice";
import { userHomeSelector } from "../../../../redux/slices/user/userHomeSlice";
import {
  getCreateReviewData,
  reviewSelector,
} from "../../../../redux/slices/reviews/reviewSlice";
import UserMessagePopup from "./UserMessagePopup";

const BookedSalon = () => {
  const [createMessage, setCreateMessage] = useState("");
  const [assets, setAssets] = useState({});
  const { createReviewData } = useSelector(reviewSelector);
  const { singleBookedSalon, isSuccess } = useSelector(bookingSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
      getMessageToSend({
        user_type: assets?.role,
        message: createMessage,
      })
    );
    setAssets({
      token: assets?.token,
      bookingId: singleBookedSalon?._id,
    });
  }, [createMessage]);

  useEffect(() => {
    dispatch(
      getCreateReviewData({
        ...createReviewData,
        booking: singleBookedSalon?._id,
        salon: singleBookedSalon?.salon?._id,
      })
    );
  }, [singleBookedSalon]);

  return (
    <View style={tw`p-5 my-5`}>
      <View style={tw`flex flex-row`}>
        <Icon
          name="arrow-left"
          type="feather"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={tw`font-bold text-lg ml-2`}>Booked Salon</Text>
      </View>
      {singleBookedSalon?._id && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`my-5 flex`}>
            <Image
              style={{ width: "100%" }}
              source={require("../../../../assets/img/current.png")}
            />
            <View style={tw`my-5 flex flex-row items-start justify-between`}>
              <Text style={tw`text-base`}>
                Status: {singleBookedSalon?.status}
              </Text>
              {singleBookedSalon?.status === "complete" ? (
                <Text style={tw`text-xl text-green-800`}>
                  The booking is Completed
                </Text>
              ) : singleBookedSalon?.status === "cancel" ? (
                <Text style={tw`text-xl text-red-800`}>
                  The booking is canceled
                </Text>
              ) : (
                <View style={tw`flex flex-col justify-end items-end`}>
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
              )}
            </View>
            <View style={tw`my-5`}>
              <Text style={tw`font-bold text-lg mb-3 `}>Uploaded Images</Text>
            </View>

            {/* Message section start */}
            <Text style={tw`font-bold text-lg mb-5`}>Message</Text>
            {singleBookedSalon?.messages?.map((message) => (
              <View key={message?._id}>
                {message?.user_type === "hair_dresser" ? (
                  <View style={tw`flex flex-row justify-between mt-4`}>
                    <View style={tw`p-5 bg-black rounded-lg`}>
                      <Text style={tw`text-white text-lg w-60 text-base`}>
                        {message?.message}
                      </Text>
                    </View>
                    <View>
                      <Image
                        style={{
                          width: 36,
                          height: 36,
                        }}
                        source={require("../../../../assets/img/profile.png")}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                ) : (
                  <View style={tw`flex flex-row justify-between mt-6`}>
                    <View>
                      <Image
                        style={{
                          width: 36,
                          height: 36,
                        }}
                        source={require("../../../../assets/img/profile.png")}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={tw`p-5 bg-black rounded-lg`}>
                      <Text style={tw`text-white text-lg w-60 text-base`}>
                        {message?.message}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ))}

            {/* Message section end */}

            {/* Message section start */}
            {singleBookedSalon?.status !== "cancel" &&
              singleBookedSalon?.status !== "complete" && (
                <>
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
                      onChangeText={(text) => setCreateMessage(text)}
                      numberOfLines={4}
                    />
                  </View>
                  <View style={tw`mt-2 flex flex-row justify-end`}>
                    {/* <UserMessagePopup onPress={() => dispatch(createMessageToSend(assets))} getUpdatedBookings= {() => dispatch(getBookingsByUser(assets))}/> */}
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
                      onPress={() => {
                        dispatch(createMessageToSend(assets));
                        if (isSuccess) {
                          dispatch(getMessages(assets));
                        }
                      }}
                    />
                  </View>
                </>
              )}
            {singleBookedSalon?.status !== "cancel" &&
              singleBookedSalon?.status !== "complete" && (
                <ResponsePopup bookingInfo={singleBookedSalon} />
              )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

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

export default BookedSalon;
