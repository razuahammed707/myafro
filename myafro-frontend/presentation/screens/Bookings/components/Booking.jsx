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
import { useSelector } from "react-redux";
import { bookingSelector } from "../../../../redux/slices/booking/bookingSlice";

const Booking = ({ margin, previous }) => {
  const { bookings } = useSelector(bookingSelector);
  return (
    <View style={tw` flex flex-row items-center justify-between ${margin}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {previous === "previous"
          ? bookings
              ?.filter((book) => book.status === "complete")
              .map((booking) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("CurrentHair")}
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
              ))
          : bookings
              ?.filter((book) => book.status === "booked")
              .map((booking) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("CurrentHair")}
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
              ))}
      </ScrollView>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({});
