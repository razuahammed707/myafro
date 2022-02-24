import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import { useState } from "react";
// import { processFontFamily, useFonts } from "expo-font";

const Login = () => {
  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const [showPassword, setShowPassword] = useState(false)
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
            source={require("../../../assets/img/login.png")}
          />
        </View>
        <View style={tw`h-1/1`}>
          <Text style={{fontFamily: "Nunito_800ExtraBold"}}>Login</Text>
          <View>
            <Input
              placeholder="Email id"
              leftIcon={
                <Icon
                  name="alternate-email"
                  type="material"
                  size={20}
                  color="black"
                />
              }
              style={{fontSize:14}}
            />
            <Input
              placeholder="Password"
              leftIcon={
                <Icon name="lock" type="fontawesome" size={20} color="black" />
              }
              style={{fontSize:14}}
            />
          </View>
          <Text
            style={tw`text-right text-sm text-gray-400 mt--5 mb-3 `}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot Password?
          </Text>
          <Button title="Login" onPress={() => navigation.navigate('Tabs')} />
          <View style={tw`my-4 flex items-center justify-center p-3`}>
            <View style={styles.grayBorder} />
            <Text
              style={tw`text-center font-bold text-gray-400 mt--3 bg-white px-2`}
            >
              OR
            </Text>
          </View>
          <View
            style={tw`flex flex-row items-center justify-center p-3 mx-2 mb-5 border-gray-300 border rounded-lg`}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
              }}
              source={require("../../../assets/img/google.png")}
            />
            <Text style={tw`text-base ml-4`}>Login with Google</Text>
          </View>
          <Text style={tw`text-sm text-gray-400 text-center`}>
            Don't have account?{" "}
            <Text
              style={tw`font-bold text-black`}
              onPress={() => navigation.navigate("Signup")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  // text: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginLeft: 10,
  //   marginBottom: 15,
  // },
  grayBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "gray",
  },
});
