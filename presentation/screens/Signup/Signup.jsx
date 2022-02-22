import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
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
              style={{fontSize:14}}
            />
            <Input
              placeholder="Full name"
              leftIcon={
                <Icon name="user" type="antdesign" size={24} color="black" />
              }
              style={{fontSize:14}}
            />
            <Input
              placeholder="Mobile number"
              leftIcon={
                <Icon name="phone" type="material" size={24} color="black" />
              }
              style={{fontSize:14}}
            />
            <Text style={tw`text-gray-600 text-sm px-2`}>
              By signing up, you are agree to our{" "}
              <Text style={tw`font-bold text-black`}>
                Terms and Condition and Privacy Policy
              </Text>
            </Text>
          </View>
          <Button title="Sign Up" onPress={() => navigation.navigate('Onboard')}/>
          <Text style={tw`text-sm text-gray-400 text-center mt-4`}>
            Joined us before?{" "}
            <Text
              style={tw`font-bold text-black`}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

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
