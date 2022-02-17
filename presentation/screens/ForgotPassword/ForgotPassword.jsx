import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`p-5 bg-white`}>
      <View style={tw`flex flex-row justify-start`}>
      <Icon name="arrow-left" type="feather" size={28} color="black" onPress={() => navigation.goBack()}/>
      </View>
      <TouchableOpacity>
        <View style={tw`h-75 p-5 flex items-center`}>
          <Image
            style={{
              width: 250,
              height: 250,
              resizeMode: "cover",
            }}
            source={require("../../../assets/img/forgot.png")}
          />
        </View>
        <View style={tw`h-1/1`}>
          <Text style={styles.text}>Forgot Password?</Text>
          <Text style={tw`text-sm text-gray-400 text-left mx-2 mb-10`}>
            Don’t worry! it happens. Please enter the address associated with
            your account.
          </Text>
          <View style={tw`mb-10`}>
            <Input placeholder="Email ID / Mobile number" style={{fontSize:14}}/>
          </View>

          <Button
            title="Submit"
            onPress={() => navigation.navigate("ResetPassword")}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 15,
  },
});
