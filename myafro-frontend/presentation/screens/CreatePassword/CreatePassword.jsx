import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const CreatePassword = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`p-5 bg-white`}>
      <View>
        <View style={tw`p-5 flex items-center`}>
          <Image
            style={{
              width: 225,
              height: 212,
              resizeMode: "contain",
            }}
            source={require("../../../assets/img/signup.png")}
          />
        </View>
        <View style={tw`h-1/1`}>
          <Text style={styles.text}>Create Password</Text>
          <View style={tw`mb-5`}>
            <Input
              placeholder="Password"
              leftIcon={
                <Icon name="lock" type="feather" size={20} color="black" />
              }
              style={{ fontSize: 14 }}
            />
            <Input
              placeholder="Confirm Password"
              leftIcon={
                <Icon name="lock" type="feather" size={20} color="black" />
              }
              style={{ fontSize: 14 }}
            />
            <Text style={tw`text-gray-600 text-sm px-2`}>
              You are one step away to create your account
            </Text>
          </View>
          <Button
            title="Create"
            onPress={() => navigation.navigate("Onboard")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 15,
  },
  grayBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "gray",
  },
});
