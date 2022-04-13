import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  getMessages,
  getSingleBooking,
} from "../../../../redux/slices/booking/bookingSlice";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment'

const Booking = ({ margin, previous }) => {
  const { bookings, isSuccess, token } = useSelector(bookingSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getBooking = (id) => {
    const uniqueBooking = bookings?.find((booking) => booking._id === id);
    dispatch(getSingleBooking(uniqueBooking));
  };

  const previousTab = bookings.length >0 && bookings?.filter(
    (booking) => booking.status === "complete" || booking.status === "cancel"
  );
  const activeTab = bookings.length > 0 && bookings?.filter((book) => book.status === "booked");

  return (
    <View style={tw` flex flex-row items-center justify-between ${margin}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {previous === "previous" ? (
          previousTab.length === 0 ? (
            <View style={tw`mt-20 flex flex-row justify-center`}>
              <Image
                source={require("../../../../assets/img/notFound.png")}
                height={100}
                resizeMode="cover"
              />
            </View>
          ) : (
            previousTab.length > 0 && previousTab.map((booking) => (
              <TouchableOpacity
                onPress={() => {
                  getBooking(booking?._id);
                  navigation.navigate("CurrentHair");
                  token !== null &&
                    dispatch(
                      getMessages({ token: token, bookingId: booking?._id })
                    );
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
                        {booking?.user?.full_name}
                      </Text>
                      <View style={tw`flex flex-row items-center my-1`}>
                        <Text style={tw`text-gray-400 mr-2 text-sm`}>
                          {moment(booking?.starting_time).format('lll')}
                        </Text>
                        <Icon
                          name="arrow-right"
                          type="feather"
                          size={20}
                          color="gray"
                        />
                        <Text style={tw`text-gray-400 ml-2 text-sm`}>
                          {moment(booking?.ending_time).format('lll')}
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
          )
        ) : activeTab.length === 0 ? (
          <View style={tw`mt-20 flex flex-row justify-center`}>
            <Image
              source={require("../../../../assets/img/notFound.png")}
              height={100}
              resizeMode="cover"
            />
          </View>
        ) : (
         activeTab.length > 0 && activeTab.map((booking) => (
            <TouchableOpacity
              onPress={() => {
                getBooking(booking?._id);
                navigation.navigate("CurrentHair");
                token !== null &&
                  dispatch(
                    getMessages({ token: token, bookingId: booking?._id })
                  );
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
                      {booking?.user?.full_name}
                    </Text>
                    <View style={tw`flex flex-row items-center my-1`}>
                      <Text style={tw`text-gray-400 mr-2 text-sm`}>
                      {moment(booking?.starting_time).format('lll')}
                      </Text>
                      <Icon
                        name="arrow-right"
                        type="feather"
                        size={20}
                        color="gray"
                      />
                      <Text style={tw`text-gray-400 ml-2 text-sm`}>
                      {moment(booking?.ending_time).format('lll')}
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
        )}
      </ScrollView>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({});
