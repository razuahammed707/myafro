import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Icon } from "react-native-elements";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getUserUpdateValues,
  updateUser,
  userProfileSelector,
} from "../../../redux/slices/user/userProfileSlice";
import Loader from "../../components/Loader/Loader";
import BookingHistory from "./BookingHistory";

const UserProfile = () => {
  const navigation = useNavigation();
  const [assets, setAssets] = useState(null);
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const { userInfo, updateUserData, isSuccess, isFetching } = useSelector(userProfileSelector);
  const dispatch = useDispatch();

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
    dispatch(
      getUserUpdateValues({
        ...updateUserData,
        full_name: name || userInfo?.full_name,
        address: address || userInfo?.address,
      })
    );
  }, [name, address]);

  useLayoutEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    assets !== null && dispatch(getUser(assets));
  }, [assets]);

  // console.log(updateUserData);

  return (
    <SafeAreaView>
        <View>
          <View
            style={tw`flex flex-row items-center justify-between px-5 py-4 border-b border-gray-200`}
          >
            <TouchableOpacity
              style={tw`flex flex-row items-center`}
              onPress={() => navigation.goBack()}
            >
              <Icon name="cross" type="entypo" size={20} color="black" />
              <Text style={tw`text-base font-bold`}>Cancel</Text>
            </TouchableOpacity>
            <Text style={tw`text-base font-bold`}>Profile</Text>
            <TouchableOpacity
              style={tw`text-base font-bold`}
              onPress={() => dispatch(updateUser(assets))}
            >
             <Text style={tw`text-base font-bold`}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`mb-5 h-full`}>
            <View
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "row",
                position: "relative",
              }}
            >
              <Avatar
                size={64}
                rounded
                source={require("../../../assets/img/1.png")}
              />
              <View style={tw`absolute bottom-6 z-10 left-15`}>
                <Icon name="edit-2" type="feather" size={16} color="white" />
              </View>
              <View style={tw`ml-4`}>
                <Text style={tw`text-base font-bold`}>
                  {userInfo?.full_name}
                </Text>
                <Text style={tw` text-sm text-gray-500`}>{userInfo?.role}</Text>
              </View>
            </View>
            <View>
              <Text style={tw`font-bold text-base px-5 mb-3`}>Personal Details</Text>
              <View>
                <Text style={tw`ml-5`}>Full name</Text>
                <TextInput
                  style={styles.input}
                    onChangeText={(newText) => setName(newText)}
                  defaultValue={userInfo?.full_name}
                  placeholder="Name"
                  keyboardType="default"
                />
              </View>
              <View>
                <Text style={tw`ml-5`}>Email</Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={(newText) => setName(newText)}
                  defaultValue={userInfo?.email}
                  placeholder="Email"
                  editable={false}
                  keyboardType="default"
                />
              </View>
              <View>
                <Text style={tw`ml-5`}>Mobile</Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={(newText) => setName(newText)}
                  defaultValue={userInfo?.mobile}
                  editable={false}
                  placeholder="Mobile"
                  keyboardType="default"
                />
              </View>
              <View>
                <Text style={tw`ml-5`}>Address</Text>
                <TextInput
                  multiline
                  numberOfLines={4}
                  style={styles.input}
                  onChangeText={(newText) => setAddress(newText)}
                  defaultValue={userInfo?.address}
                  placeholder="Address"
                />
              </View>
            </View>
            {/* <BookingHistory /> */}
          </View>
        </View>
        <Loader loading={isFetching} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 8,
  },
});
export default UserProfile;
