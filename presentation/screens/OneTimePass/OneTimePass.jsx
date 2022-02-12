import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const OneTimePass = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`p-5 bg-white`}>
      <View style={tw`h-75 p-5 flex items-center`}>
        <Image
          style={{
            width: 250,
            height: 250,
            resizeMode: "cover",
          }}
          source={require("../../../assets/img/otp.png")}
        />
      </View>
      <View style={tw`h-1/1`}>
        <Text style={styles.text}>Enter OTP</Text>
        <Text style={tw`text-xl text-gray-400 text-left mx-2 mb-10`}>
          An 4 digit code has been sent to +898989002111
        </Text>
        <View style={tw`flex items-center flex-row justify-around`}>
          <View style={tw` px-4 border border-gray-400 rounded-xl`}>
            <Input placeholder="" />
          </View>
          <View style={tw` px-4 border border-gray-400 rounded-xl`}>
            <Input placeholder="" />
          </View>
          <View style={tw` px-4 border border-gray-400 rounded-xl`}>
            <Input placeholder="" />
          </View>
          <View style={tw` px-4 border border-gray-400 rounded-xl`}>
            <Input placeholder="" />
          </View>
        </View>
        <View>
          <Text style={tw`text-lg font-regular text-center mt-5`}>
            Tap to resend OTP
          </Text>
        </View>
        <View style={tw`mt-10`}>
          <Button title="Submit" onPress={() => navigation.navigate("")} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OneTimePass;

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 15,
  },
  grayBorder: {
    height: 1,
    width: "20%",
    backgroundColor: "gray",
  }
});
