import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const BottomBar = () => {
  const navigation = useNavigation();
  return (
    <View
      style={tw`flex items-center flex-row justify-between bg-white py-2 px-5 border border-gray-200 absolute bottom-0 left-0 right-0`}
    >
      <TouchableOpacity>
        <View>
          <Icon name="home" type="antdesign" size={25} color="black" />
          <Text style={tw`text-md`}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View style={tw`opacity-15`}>
          <Icon name="wheelchair" type="fontisto" size={25} color="black" />
          <Text style={tw`text-md`}>Saloon</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Onboard")}>
        <View style={tw`opacity-15`}>
          <Icon name="user" type="antdesign" size={28} color="black" />
          <Text style={tw`text-md`}>Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
