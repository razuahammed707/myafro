import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const BottomBar = ({ name1, name2, name3 }) => {
  const navigation = useNavigation();
  return (
    <View
      style={tw`flex items-center flex-row justify-between bg-white py-2 px-5 border border-gray-200 absolute bottom-0 left-0 right-0`}
    >
      <TouchableOpacity onPress={() => navigation.navigate("HomeTabs")}>
        <View>
          <Icon name="home" type="antdesign" size={20} color="black" />
          <Text style={tw`text-sm`}>{name1 || "Home"}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("UserBookings")}>
        <View style={tw`opacity-15`}>
          <Icon name="wheelchair" type="fontisto" size={20} color="black" />
          <Text style={tw`text-sm`}>{name2 || "Bookings"}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <View style={tw`opacity-15`}>
          <Icon name="user" type="antdesign" size={20} color="black" />
          <Text style={tw`text-sm`}>{name3 || "Account"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
