import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import ResponsePopup from "../../../components/ResponsePopup/ResponsePopup";
import { Button, Icon } from "react-native-elements";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  createMessageToSend,
  getMessageToSend,
} from "../../../../redux/slices/booking/bookingSlice";

const BookedSalon = ({ uniqueBooking }) => {
  const [createMessage, setCreateMessage] = useState("");
  const [assets, setAssets] = useState({});
  const { sendMessage, isSuccess, isFetching } = useSelector(bookingSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMessageToSend({
        user_type: uniqueBooking?.role,
        message: createMessage,
      })
    );
    setAssets({
      token: uniqueBooking?.token,
      bookingId: uniqueBooking?.uniqueBooking?._id,
    });
  }, [createMessage]);

  return (
    <View style={tw`mb-5`}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`my-5 flex`}>
          <Image
            style={{ width: "100%" }}
            source={require("../../../../assets/img/current.png")}
          />
          <View style={tw`my-5 flex flex-row items-start justify-between`}>
            <Text style={tw`text-base`}>
              Status: {uniqueBooking?.uniqueBooking?.status}
            </Text>
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
          </View>
          <View style={tw`my-5`}>
            <Text style={tw`font-bold text-lg mb-3 `}>Uploaded Images</Text>
          </View>

          {/* Message section start */}
          <Text style={tw`font-bold text-lg mb-5`}>Message</Text>
          {uniqueBooking?.uniqueBooking?.messages?.map((message) => (
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
          <Text style={tw`font-bold text-lg mb-3 mt-6 `}>Write Message</Text>
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
          <ResponsePopup bookingInfo={uniqueBooking?.uniqueBooking?.status} />
        </View>
      </ScrollView>
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
