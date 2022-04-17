import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ResponsePopup from "../../../components/ResponsePopup/ResponsePopup";
import { Button, Icon } from "react-native-elements";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  createMessageToSend,
  getBookings,
  getBookingsByUser,
  getMessages,
  getMessageToSend,
} from "../../../../redux/slices/booking/bookingSlice";
import {
  getCreateReviewData,
  reviewSelector,
} from "../../../../redux/slices/reviews/reviewSlice";
import moment from "moment";

const BookedSalon = () => {
  const [createMessage, setCreateMessage] = useState("");
  const [assets, setAssets] = useState(null);
  const [creds, setCreds] = useState(null);
  const { createReviewData } = useSelector(reviewSelector);
  const { singleBookedSalon, isSuccess, getMessagesData } =
    useSelector(bookingSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const scrollViewRef = useRef();

  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        setAssets({
          token: parsedToken?.access_token,
          role: parsedToken?.user?.user?.role,
          bookingId: singleBookedSalon?._id,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getToken();
  }, [singleBookedSalon]);

  useEffect(() => {
    dispatch(
      getMessageToSend({
        user_type: assets?.role,
        message: createMessage,
      })
    );
    setCreds({
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
    // creds !== null && dispatch(getMessages(creds));
  }, []);

  console.log(getMessagesData);
  console.log(assets);

  return (
    <SafeAreaView style={tw`p-5 relative h-full bg-white`}>
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
        <>
          <View style={tw`mb-5 flex`}>
            <Image
              style={{ width: "100%" }}
              source={require("../../../../assets/img/current.png")}
            />
            <View style={tw`mt-5 flex flex-row items-start justify-between`}>
              {singleBookedSalon?.status === "pending" ? (
                <View style={tw`px-5 py-2 border border-pink-500 rounded-lg`}>
                  <Text style={tw`text-base text-pink-500`}>Pending</Text>
                </View>
              ) : singleBookedSalon?.status === "booked" ? (
                <View style={tw`px-5 py-2 border border-green-500 rounded-lg`}>
                  <Text style={tw`text-base text-green-500`}>Active</Text>
                </View>
              ) : singleBookedSalon?.status === "cancel" ? (
                <View style={tw`px-5 py-2 border border-red-500 rounded-lg`}>
                  <Text style={tw`text-base text-red-500`}>Canceled</Text>
                </View>
              ) : (
                <View style={tw`px-5 py-2 border border-green-500 rounded-lg`}>
                  <Text style={tw`text-base text-green-500`}>Completed</Text>
                </View>
              )}
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
                    title="Click to Upload"
                    buttonStyle={{
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      backgroundColor: "#fff",
                      //   width:"50%",
                      borderColor: "#000",
                      marginTop: -5,
                    }}
                    type="standard"
                    icon={
                      <Icon
                        name="upload-cloud"
                        type="feather"
                        size={20}
                        color="#000"
                        style={tw`mr-2`}
                      />
                    }
                    iconPosition="left"
                    titleStyle={{ fontSize: 14, color: "#000" }}
                  />
                </View>
              )}
            </View>

            {/* Message section start */}
            <Text style={tw`font-bold text-lg mt-2`}>Messages</Text>
            <ScrollView
              style={tw`h-70 `}
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              {getMessagesData?.messages?.map((message) => (
                <View key={message?._id}>
                  {message?.user_type === "hair_dresser" ? (
                    <View style={tw`mt-2`}>
                      <View
                        style={{
                          backgroundColor: "#f3e6e3",
                          padding: 15,
                          // borderRadius: 10,
                          width: "100%",
                          borderTopRightRadius: 15,
                          borderBottomLeftRadius: 15,
                        }}
                      >
                        <Text style={tw`text-black text-lg w-60 text-base`}>
                          {message?.message}
                        </Text>
                      </View>
                      <Text style={tw`mt-1 text-gray-400`}>
                        {" "}
                        {moment(getMessagesData?.createdAt)
                          .startOf("hour")
                          .fromNow()}
                      </Text>
                      {/* <Text>{message?.createdAt}</Text> */}
                      {/* <View>
                        <Image
                          style={{
                            width: 36,
                            height: 36,
                          }}
                          source={require("../../../../assets/img/profile.png")}
                          resizeMode="contain"
                        />
                      </View> */}
                    </View>
                  ) : (
                    <View style={tw` mt-2`}>
                      {/* <View>
                        <Image
                          style={{
                            width: 36,
                            height: 36,
                          }}
                          source={require("../../../../assets/img/profile.png")}
                          resizeMode="contain"
                        />
                      </View> */}
                      <View
                        style={{
                          backgroundColor: "#DCDCDC",
                          padding: 15,
                          borderTopLeftRadius: 15,
                          borderBottomRightRadius: 15,
                          width: "100%",
                        }}
                      >
                        <Text
                          style={tw`text-black text-right text-lg text-base`}
                        >
                          {message?.message}
                        </Text>
                      </View>
                      <Text style={tw`mt-1 text-right text-gray-400`}>
                        {" "}
                        {moment(getMessagesData?.createdAt)
                          .startOf("hour")
                          .fromNow()}
                      </Text>
                    </View>
                  )}
                </View>
              ))}

              {/* Message section end */}

              {/* Message section start */}
            </ScrollView>
          </View>
        </>
      )}
      {/* <View style={tw`bg-green-400`}> */}
{singleBookedSalon?.status !== "cancel" &&
          singleBookedSalon?.status !== "complete" && (
            <View style={tw`absolute w-full bottom-0 left-5 z-50 bg-white h-40`}>
              <View
                style={{
                  backgroundColor: "lightgray",
                  borderBottomColor: "#000000",
                  borderRadius: 10,
                  width: "80%",
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Type a message"
                  multiline={true}
                  onChangeText={(text) => setCreateMessage(text)}
                  numberOfLines={2}
                  />
              </View>
              <View style={tw`absolute right--1 top--1`}>
                {/* <UserMessagePopup onPress={() => dispatch(createMessageToSend(assets))} getUpdatedBookings= {() => dispatch(getBookingsByUser(assets))}/> */}
                <Button
                  buttonStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
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
                    assets !== null && dispatch(getMessages(assets));
                  }}
                />
              </View>
            </View>
          )}
        {singleBookedSalon?.status !== "cancel" &&
          singleBookedSalon?.status !== "complete" && (
            <ResponsePopup bookingInfo={singleBookedSalon} />
          )}
      {/* </View> */}
    </SafeAreaView>
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
    margin: 5,
    padding: 5,
    borderRadius: 8,
  },
});

export default BookedSalon;
