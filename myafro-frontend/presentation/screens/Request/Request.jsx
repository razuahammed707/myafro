import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  getBookings,
  getSingleBooking,
} from "../../../redux/slices/booking/bookingSlice";
import Loader from "../../components/Loader/Loader";

const Request = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bookings, isSuccess, isFetching, singleBooking } =
    useSelector(bookingSelector);
  const [assets, setAssets] = useState(null);

  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        setAssets({
          token: parsedToken?.access_token,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const getBooking = (id) => {
    const uniqueBooking = bookings?.find((booking) => booking._id === id);
    dispatch(getSingleBooking(uniqueBooking));
  };

  useEffect(() => {
    assets !== null && dispatch(getBookings(assets));
  }, [assets]);

  console.log("nice");
  return (
    <SafeAreaView style={tw`p-5 h-full`}>
      <View style={tw`flex flex-row`}>
        <Icon
          name="arrow-left"
          type="feather"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={tw`font-bold text-lg ml-2`}>Request Screen</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isSuccess ? (
          bookings
            ?.filter((book) => book.status === "pending")
            .map((booking) => (
              <TouchableOpacity
                onPress={() => {
                  getBooking(booking._id);
                  navigation.navigate("CurrentHair");
                }}
                style={tw` mt-3 flex flex-row items-center justify-between `}
                key={booking._id}
              >
                <View style={tw`flex flex-row items-center`}>
                  {booking?.user?.profile === "" ? (
                    <Image
                      style={{
                        width: 36,
                        height: 36,
                      }}
                      source={require("../../../assets/img/profile.png")}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      style={{
                        width: 36,
                        height: 36,
                      }}
                      source={{ uri: booking?.user?.profile }}
                      resizeMode="contain"
                    />
                  )}
                  <View style={tw`ml-4`}>
                    <View>
                      <Text style={tw`font-bold text-lg mr-2`}>
                        {booking?.user?.full_name}
                      </Text>
                      <View style={tw`flex flex-row items-center my-1`}>
                        <Text style={tw`text-gray-400 mr-2 text-sm`}>
                          {booking?.starting_time}
                        </Text>
                        <Icon
                          name="arrow-right"
                          type="feather"
                          size={20}
                          color="gray"
                        />
                        <Text style={tw`text-gray-400 ml-2 text-sm`}>
                          {booking?.ending_time}
                        </Text>
                      </View>
                    </View>
                    <View style={tw`flex flex-row text-sm`}>
                      <Text>Lorem ipsum dolor sit.</Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Icon
                    name="arrow-forward-ios"
                    type="material"
                    size={20}
                    color="gray"
                  />
                </View>
              </TouchableOpacity>
            ))
        ) : (
          <Loader loading={isFetching} />
        )}
      </ScrollView>
      <View style={tw`h-1/2 flex flex-row justify-center`}>
        {/* <Image
                      source={require("../../../assets/img/notFound.png")}
                      height={100}
                      resizeMode="cover"
                    /> */}
        <Text style={tw`text-xl text-gray-800`}>
          No booking request found !
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Request;

const styles = StyleSheet.create({});
