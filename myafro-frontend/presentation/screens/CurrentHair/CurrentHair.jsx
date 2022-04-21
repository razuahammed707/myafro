import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Button, Icon, Overlay } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  createMessageToSend,
  getBookings,
  getMessages,
  getMessageToSend,
  getUpdateBookingData,
  updateBooking,
} from "../../../redux/slices/booking/bookingSlice";
import Loader from "../../components/Loader/Loader";
import UserMediaCarousel from "./components/UserMediaCarousel";
import MessagePopup from "./components/MessagePopup";
import moment from "moment";

const CurrentHair = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const {
    bookings,
    singleBooking,
    sendMessage,
    isSuccess,
    isFetching,
    getMessagesData,
  } = useSelector(bookingSelector);
  const [assets, setAssets] = useState(null);
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const [createMessage, setCreateMessage] = useState("");

  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        setAssets({
          token: parsedToken?.access_token,
          bookingId: singleBooking?._id,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Do you want to decline the request?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            dispatch(updateBooking(assets));
            toggleOverlay();
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

  useEffect(() => {
    dispatch(
      getMessageToSend({
        ...sendMessage,
        user_type: "hair_dresser",
        message: createMessage,
      })
    );
  }, [createMessage]);

  return (
    <SafeAreaView style={tw`p-5 relative h-full bg-white`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex flex-row`}>
          <Icon
            name="arrow-left"
            type="feather"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={tw`font-bold text-lg ml-2`}>Current Hair</Text>
        </View>
        <View style={tw`mt-5`}>
          {/* <Image
            style={{ width: "100%" }}
            source={require("../../../assets/img/current.png")}
          /> */}
          <UserMediaCarousel singleBooking={singleBooking}/>
          <View style={tw`mt-5`}>
            {singleBooking?.status === "cancel" ? (
              <View style={tw`flex flex-row justify-center`}>
                <Text style={tw`text-xl text-red-800`}>
                  The booking is canceled
                </Text>
              </View>
            ) : singleBooking?.status === "booked" ? (
              <View style={tw`flex flex-row justify-center`}>
                <Text style={tw`text-xl text-green-800`}>Already Booked</Text>
              </View>
            ) : singleBooking?.status === "complete" ? (
              <View style={tw`flex flex-row justify-center`}>
                <Text style={tw`text-xl text-green-800`}>
                  The booking is completed
                </Text>
              </View>
            ) : (
              <View style={tw`flex flex-row items-center justify-between`}>
                <Button
                  title="Accept"
                  buttonStyle={{
                    paddingHorizontal: 10,
                    paddingVertical: 16,
                    backgroundColor: "#4caf50",
                    width: "87%",
                  }}
                  type="clear"
                  titleStyle={{ fontSize: 14 }}
                  onPress={() => {
                    // setIsBooked(true);
                    // if (isBooked) {
                    //   dispatch(updateBooking(assets));
                    // }
                    dispatch(
                      getUpdateBookingData({
                        status: "booked",
                      })
                    );
                    dispatch(updateBooking(assets));
                    toggleOverlay();
                  }}
                />

                {isSuccess && !isFetching && (
                  <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={styles.container}>
                      <Text style={styles.textPrimary}>
                        Booking request is{" "}
                        {!showConfirmDialog ? "declined" : "accepted"}
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
                        dispatch(getBookings(assets));
                        navigation.navigate("Bookings");
                      }}
                    />
                  </Overlay>
                )}
                <Button
                  title="Decline"
                  buttonStyle={{
                    paddingHorizontal: 10,
                    paddingVertical: 16,
                    backgroundColor: "#ed2929",
                    width: "87%",
                  }}
                  type="clear"
                  titleStyle={{ fontSize: 14 }}
                  onPress={() => {
                    showConfirmDialog();
                    dispatch(
                      getUpdateBookingData({
                        status: "cancel",
                      })
                    );
                  }}
                />
              </View>
            )}
          </View>

          {/* Message section start */}
          <Text style={tw`font-bold text-lg my-2`}>Messages</Text>
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
                        borderTopRightRadius: 20,
                          borderTopLeftRadius: 20,
                          // borderRadius:15,
                          borderBottomLeftRadius: 20,
                        width: "100%",
                      }}
                    >
                      <Text style={tw`text-black text-right text-lg text-base`}>
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
        
          {/* </View> */}
        </View>
      </ScrollView>
        {/* <View style={tw`bg-green-400`}> */}
        {singleBooking?.status !== "cancel" &&
            singleBooking?.status !== "complete" && (
              <View
                style={tw`absolute w-full bottom-0 left-5 z-50 bg-white h-30 pt-3`}
              >
                <View
                  style={{
                    backgroundColor: "lightgray",
                    // borderBottomColor: "#000000",
                    borderRadius: 10,
                    width: "80%",
                  }}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    // multiline={true}
                    onChangeText={(text) => setCreateMessage(text)}
                    // numberOfLines={2}
                  />
                </View>
                <View style={tw`absolute right--1 top--2 pt-3`}>
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
      {/* <Loader loading={isFetching}/> */}
    </SafeAreaView>
  );
};

export default CurrentHair;

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
