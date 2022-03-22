import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { bookingSelector, getBookingsByUser } from "../../../../redux/slices/booking/bookingSlice";
import Loader from "../../../components/Loader/Loader";

const UserBooking = ({ margin, previous, pending }) => {
  const { userBookings, isSuccess, isFetching } = useSelector(bookingSelector);
  const navigation = useNavigation()
  const dispatch = useDispatch();
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

  useEffect(() => {
    assets !== null && dispatch(getBookingsByUser(assets));
  }, [assets]);
  return (
    <View style={tw` flex flex-row items-center justify-between ${margin}`}>
      {isSuccess && userBookings.length > 0 ? <ScrollView showsVerticalScrollIndicator={false}>
        {previous === "previous"
          ? userBookings.filter((book) => book.status !== "pending" && book.status !=="booked")
              .map((booking) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("BookingConfirmation")}
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
                        source={require("../../../../assets/img/profile.png")}
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
                          {booking?.salon?.name}
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
          : pending === "pending"
          ? userBookings?.filter((book) => book.status === "pending")
              .map((booking) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("BookingConfirmation")}
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
                        source={require("../../../../assets/img/profile.png")}
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
                          {booking?.salon?.name}
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
          : userBookings?.filter((book) => book.status === "booked")
              .map((booking) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("BookingConfirmation")}
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
                        source={require("../../../../assets/img/profile.png")}
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
                          {booking?.salon?.name}
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
              ))}
      </ScrollView> : <Loader loading={isFetching}/>}
    </View>
  );
};

export default UserBooking;

const styles = StyleSheet.create({});
