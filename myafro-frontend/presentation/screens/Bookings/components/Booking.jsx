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
  getSingleBooking,
} from "../../../../redux/slices/booking/bookingSlice";
import { useNavigation } from "@react-navigation/native";

const Booking = ({ margin, previous }) => {
  const { bookings, isSuccess } = useSelector(bookingSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getBooking = (id) => {
    const uniqueBooking = bookings?.find((booking) => booking._id === id);
    console.log(uniqueBooking);
    dispatch(getSingleBooking(uniqueBooking));
  };

  return (
    <View style={tw` flex flex-row items-center justify-between ${margin}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {previous === "previous"
          ? bookings?.length > 0 ?
            bookings
              ?.filter(
                (book) => book?.status === "cancel" && book.status === "complete"
              )
              .map((booking) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CurrentHair");
                    getBooking(booking?._id);
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
              )) : (
              <View style={tw`mt-20 flex flex-row justify-center`}>
                <Image
                  source={require("../../../../assets/img/notFound.png")}
                  height={100}
                  resizeMode="cover"
                />
              </View>
            )
          : bookings.length > 0 ?
            bookings
              ?.filter((book) => book?.status === "booked")
              .map((booking) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CurrentHair");
                    getBooking(booking?._id);
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
              )) : (
              <View style={tw`mt-20 flex flex-row justify-center`}>

                <Image
                  source={require("../../../../assets/img/notFound.png")}
                  height={100}
                  resizeMode="cover"
                />
              </View>
            )}
      </ScrollView>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({});
