import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  getCreateBookingData,
} from "../../../redux/slices/booking/bookingSlice";
import Loader from "../../components/Loader/Loader";
import {
  getCreateReviewData,
  reviewSelector,
} from "../../../redux/slices/reviews/reviewSlice";
import moment from "moment";
import CurrentHairImage from "./components/CurrentHairImage";
import { mediaSelector } from "../../../redux/slices/salon/mediaSlice";

const BookingConfirmation = () => {
  const navigation = useNavigation();
  const [sendMessage, setSendMessage] = useState("");
  const [uploadImages, setUploadImages] = useState([]);
  const dispatch = useDispatch();
  const [assets, setAssets] = useState(null);
  // const [messageAssets, setMessageAssets] = useState(null);
  const {isFetchingMedia} = useSelector(mediaSelector);
  const { singleSalonId } = useSelector(userHomeSelector);
  const { isFetching, createBookingData } = useSelector(bookingSelector);

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
        starting_time: new Date("2020-12-02"),
        ending_time: new Date("2020-12-04"),
        salon: singleSalonId,
        message: sendMessage,
        current_hair: uploadImages,
      })
    );
  }, [sendMessage, uploadImages]);

  return (
    <SafeAreaView style={tw`p-5 relative w-full z-40`}>
      <View style={tw`h-full`}>
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
              <CurrentHairImage
                uploadImages={uploadImages}
                setUploadImages={setUploadImages}
              />
              <View style={tw`flex flex-row flex-wrap`}>
                {uploadImages?.map((item, i) => (
                  <View style={tw`relative w-1/3`} key={item.img_url}>
                    <Image
                      style={tw`w-full h-20 m-0`}
                      source={{ uri: item.img_url }}
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        const filterImages = [...uploadImages];
                        filterImages.splice(i, 1);
                        setUploadImages(filterImages);
                      }}
                      style={tw`absolute z-50 top-2 right-2 bg-white p-1 rounded-lg`}
                    >
                      <Icon
                        name="trash-2"
                        type="feather"
                        size={14}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              {/* <View style={tw`my-5`}>
                <Text style={tw`font-bold text-lg mb-3 `}>Uploaded Images</Text>
              </View> */}

              {/* Message section start */}
              <Text style={tw`font-bold text-lg mb-3 mt-6 `}>
                Write Message
              </Text>
              <View
                style={{
                  backgroundColor: "lightgray",
                  borderBottomColor: "#000000",
                  marginBottom: 25,
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
            </View>
          </ScrollView>
        </View>
        <ResponsePopup bookingConfirmation="confirmation" style={{position:"absolute", bottom:0}} />
      </View>
      
      <Loader loading={isFetching || isFetchingMedia} />
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
