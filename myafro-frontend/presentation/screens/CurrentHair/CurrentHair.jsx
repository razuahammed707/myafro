import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Button, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  createMessageToSend,
  getMessageToSend,
  getUpdateBookingData,
  updateBooking,
} from "../../../redux/slices/booking/bookingSlice";

const CurrentHair = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bookings, singleBooking, sendMessage } = useSelector(bookingSelector);
  const [assets, setAssets] = useState(null);
  // const [isBooked, setIsBooked] = useState(false);
  // const [isCanceled, setIsCanceled] = useState(false);
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

  // useEffect(() => {
  //   dispatch(
  //     getUpdateBookingData({
  //       status: (isBooked && "booked") || (isCanceled && "cancel"),
  //     })
  //   );
  // }, [isBooked, isCanceled]);

  // console.log(singleBooking)
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
    // setAssets({
    //   // token: uniqueBooking?.token,
    //   // bookingId: uniqueBooking?.uniqueBooking?._id,
    // });
  }, [createMessage]);

  console.log(singleBooking)

  return (
    <SafeAreaView style={tw`p-5`}>
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
        <View style={tw`my-5`}>
          <Image
            style={{ width: "100%" }}
            source={require("../../../assets/img/current.png")}
          />
          <View style={tw`my-5`}>
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
                <Text style={tw`text-xl text-green-800`}>The booking is completed</Text>
              </View>):(
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
                  }}
                />
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
                        status: "cancel"
                      })
                    );
                  }}
                />
              </View>
            )}
          </View>

          {/* Message section start */}
          <Text style={tw`font-bold text-lg mb-5`}>Message</Text>
          {singleBooking?.messages?.map((message) => (
            <View key={message?._id}>
              {message?.user_type === "hair_dresser" ? (
                <View style={tw`flex flex-row justify-between mt-4`}>
                  <View>
                    <Image
                      style={{
                        width: 36,
                        height: 36,
                      }}
                      source={require("../../../assets/img/profile.png")}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={tw`p-5 bg-black rounded-lg`}>
                    <Text style={tw`text-white text-lg w-60 text-base`}>
                      {message?.message}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={tw`flex flex-row justify-between mt-6`}>
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
                      source={require("../../../assets/img/profile.png")}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              )}
            </View>
          ))}
          {/* Message section end */}

          {singleBooking?.messages?.length < 1 && (
            <View style={tw`p-5 text-center shadow-sm`}>
              <Text style={tw`text-base`}>No message found !</Text>
            </View>
          )}

          {singleBooking?.status !== "cancel" && singleBooking?.status !== "complete" && (
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
                  onPress={() => dispatch(createMessageToSend(assets))}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
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
    margin: 12,
    padding: 10,
    borderRadius: 8,
  },
});
