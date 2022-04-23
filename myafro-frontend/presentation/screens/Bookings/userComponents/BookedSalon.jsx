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
import UserMediaCarousel from "../../CurrentHair/components/UserMediaCarousel";

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

  console.log(singleBookedSalon);

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

  return (
    <>
    <SafeAreaView style={tw`relative h-full m-5`}>
      <View style={tw`flex flex-row my-2`}>
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
          <View style={{ height: 200 }}>
            <UserMediaCarousel singleBookedSalon={singleBookedSalon} />
          </View>
          <View style={tw`mb-5 flex`}>
            {/* <Image
              style={{ width: "100%" }}
              source={require("../../../../assets/img/current.png")}
            /> */}

            <View
              style={tw` flex flex-row  justify-between items-baseline`}
            >
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
                <>
                  {/* <Button
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
                  /> */}
                </>
              )}
              {singleBookedSalon?.status !== "cancel" &&
                singleBookedSalon?.status !== "complete" && (
                  <ResponsePopup bookingInfo={singleBookedSalon} />
                )}
            </View>

            {/* Message section start */}
            <Text style={tw`font-bold text-lg`}>Messages</Text>
            <ScrollView
              style={tw`h-80`}
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
                          width: "100%",
                          borderTopRightRadius: 20,
                          borderTopLeftRadius: 20,
                          // borderRadius:15,
                          borderBottomLeftRadius: 20,
                        }}
                      >
                        <Text style={tw`text-black text-lg w-60 text-base`}>
                          {message?.message}
                        </Text>
                      </View>
                      <Text style={tw`mt-1 text-gray-400`}>
                        {moment(getMessagesData?.createdAt)
                          .startOf("hour")
                          .fromNow()}
                      </Text>
                    </View>
                  ) : (
                    <View style={tw` mt-2`}>
                      <View
                        style={{
                          backgroundColor: "#DCDCDC",
                          padding: 15,
                          borderTopRightRadius: 20,
                          borderTopLeftRadius: 20,
                          // borderRadius:15,
                          borderBottomLeftRadius: 20,
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
            </ScrollView>
          </View>
        </>
      )}
      {/* <View style={tw`bg-green-400`}> */}
      

      {/* </View> */}
    </SafeAreaView>
    {singleBookedSalon?.status !== "cancel" &&
    singleBookedSalon?.status !== "complete" && (
      <View style={tw`absolute w-full bottom-0 left-0 z-50 bg-gray-100 h-25  p-5`}>
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
            value={createMessage}
            onChangeText={(text) => setCreateMessage(text)}
            numberOfLines={2}
          />
        </View>
        <View style={tw`absolute right--1 top--1 p-5`}>
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
              setCreateMessage("");
              dispatch(createMessageToSend(assets));
              assets !== null && dispatch(getMessages(assets));
            }}
          />
        </View>
      </View>
    )}
    </>
  );
};

const styles = StyleSheet.create({
  // screen: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // box: {
  //   width: 300,
  //   height: 300,
  //   backgroundColor: "red",
  //   marginBottom: 30,
  // },
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
