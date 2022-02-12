import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const Signup = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`p-5 bg-white`}>
      <TouchableOpacity>
        <View style={tw`h-75 p-5 flex items-center`}>
          <Image
            style={{
              width: 250,
              height: 250,
              resizeMode: "cover",
            }}
            source={require("../../../assets/img/signup.png")}
          />
        </View>
        <View style={tw`h-1/1`}>
          <Text style={styles.text}>Sign Up</Text>
          <View style={tw`mb-5`}>
            <Input
              placeholder="Email id"
              leftIcon={
                <Icon
                  name="alternate-email"
                  type="material"
                  size={24}
                  color="black"
                />
              }
            />
            <Input
              placeholder="Full name"
              leftIcon={
                <Icon name="user" type="antdesign" size={24} color="black" />
              }
            />
            <Input
              placeholder="Mobile number"
              leftIcon={
                <Icon name="phone" type="material" size={24} color="black" />
              }
            />
            <Text style={tw`text-gray-600 text-lg px-2`}>
              By signing up, you are agree to our{" "}
              <Text style={tw`font-bold text-black`}>
                Terms and Condition and Privacy Policy
              </Text>
            </Text>
          </View>
          <Button title="Sign Up" />
          <Text style={tw`text-xl text-gray-400 text-center mt-5`}>
            Joined us before?{" "}
            <Text
              style={tw`font-bold text-black`}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
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
