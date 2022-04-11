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
import {
  bookingSelector,
  getBookingsByUser,
  getMessages,
  getSingleBookedSalon,
} from "../../../../redux/slices/booking/bookingSlice";
import Loader from "../../../components/Loader/Loader";
import moment from "moment";

const UserBooking = ({ margin, previous, pending, booked }) => {
  const { userBookings, isSuccess, isFetching } = useSelector(bookingSelector);
  const navigation = useNavigation();
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

  const previousTab = userBookings?.filter(
    (booking) => booking.status === "complete" || booking.status === "cancel"
  );
  const pendingTab = userBookings?.filter((book) => book.status === "pending");
  const activeTab = userBookings?.filter((book) => book.status === "booked");

  return (
    <View style={tw` flex flex-row items-center justify-between ${margin}`}>
      {isSuccess ? (
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
              previousTab.map((booking) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(getSingleBookedSalon(booking));
                    assets !== null &&
                      dispatch(
                        getMessages({
                          token: assets?.token,
                          bookingId: booking._id,
                        })
                      );
                    navigation.navigate("BookedSalon");
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
                          {booking?.salon?.name}
                        </Text>
                        <View style={tw`flex flex-row items-center my-1`}>
                          <Text style={tw`text-gray-400 mr-2 text-sm`}>
                            {moment(booking?.starting_time).format("lll")}
                          </Text>
                          <Icon
                            name="arrow-right"
                            type="feather"
                            size={20}
                            color="gray"
                          />
                          <Text style={tw`text-gray-400 ml-2 text-sm`}>
                            {moment(booking?.ending_time).format("lll")}
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
          ) : pending === "pending" ? (
            pendingTab.length === 0 ? (
              <View style={tw`mt-20 flex flex-row justify-center`}>
                <Image
                  source={require("../../../../assets/img/notFound.png")}
                  height={100}
                  resizeMode="cover"
                />
              </View>
            ) : (
              pendingTab.map((booking) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(getSingleBookedSalon(booking));
                    assets !== null &&
                      dispatch(
                        getMessages({
                          token: assets?.token,
                          bookingId: booking._id,
                        })
                      );
                    navigation.navigate("BookedSalon");
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
                          {booking?.salon?.name}
                        </Text>
                        <View style={tw`flex flex-row items-center my-1`}>
                          <Text style={tw`text-gray-400 mr-2 text-sm`}>
                            {moment(booking?.starting_time).format("lll")}
                          </Text>
                          <Icon
                            name="arrow-right"
                            type="feather"
                            size={20}
                            color="gray"
                          />
                          <Text style={tw`text-gray-400 ml-2 text-sm`}>
                            {moment(booking?.ending_time).format("lll")}
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
          ) : booked === "booked" && activeTab.length === 0 ? (
            <View style={tw`mt-20 flex flex-row justify-center`}>
              <Image
                source={require("../../../../assets/img/notFound.png")}
                height={100}
                resizeMode="cover"
              />
            </View>
          ) : (
            activeTab.map((booking) => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(getSingleBookedSalon(booking));
                  assets !== null &&
                    dispatch(
                      getMessages({
                        token: assets?.token,
                        bookingId: booking._id,
                      })
                    );
                  navigation.navigate("BookedSalon");
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
                        {booking?.salon?.name}
                      </Text>
                      <View style={tw`flex flex-row items-center my-1`}>
                        <Text style={tw`text-gray-400 mr-2 text-sm`}>
                          {moment(booking?.starting_time).format("lll")}
                        </Text>
                        <Icon
                          name="arrow-right"
                          type="feather"
                          size={20}
                          color="gray"
                        />
                        <Text style={tw`text-gray-400 ml-2 text-sm`}>
                          {moment(booking?.ending_time).format("lll")}
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
      ) : (
        <Loader loading={isFetching} />
      )}
    </View>
  );
};

export default UserBooking;

const styles = StyleSheet.create({});
