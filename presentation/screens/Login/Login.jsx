import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
// import {
//   Nunito_400Regular,
//   Nunito_600SemiBold,
//   Nunito_700Bold,
//   Nunito_800ExtraBold,
// } from "@expo-google-fonts/nunito";
// import AppLoading from "expo-app-loading";
// import { useFonts } from "expo-font";

const Login = () => {
  // let [fontsLoaded] = useFonts({
  //   Nunito_600SemiBold,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
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
            source={require("../../../assets/img/login.png")}
          />
        </View>
        <View style={tw`h-1/1`}>
          <Text style={styles.text}>Login</Text>
          <View>
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
              placeholder="Password"
              leftIcon={
                <Icon name="lock" type="fontawesome" size={24} color="black" />
              }
            />
          </View>
          <Text
            style={tw`text-right text-lg text-gray-400 mt--5 mb-3 `}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot Password?
          </Text>
          <Button title="Login" />
          <View style={tw`my-5 flex items-center justify-center p-3`}>
            <View style={styles.grayBorder} />
            <Text
              style={tw`text-center font-bold text-gray-400 mt--3 bg-white px-2`}
            >
              OR
            </Text>
          </View>
          <View
            style={tw`flex flex-row items-center justify-center p-3 mx-2 mb-5 border-gray-500 border rounded-lg`}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
              }}
              source={require("../../../assets/img/google.png")}
            />
            <Text style={tw`text-2xl ml-4`}>Login with Google</Text>
          </View>
          <Text style={tw`text-xl text-gray-400 text-center`}>
            Don't have account?{" "}
            <Text
              style={tw`font-bold text-black`}
              onPress={() => navigation.navigate("Signup")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

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
