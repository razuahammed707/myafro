import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";
import { useSelector, useDispatch } from "react-redux";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import axiosClient from "../../../config/base";
import Loader from "../../components/Loader/Loader";
import { authSelector, login } from "../../../redux/slices/login/authSlice";
import { useEffect } from "react";
// import { processFontFamily, useFonts } from "expo-font";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { message, data, isFetching, isSuccess } = useSelector(authSelector);

  // storing token to web storage
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("access_token", token);
    } catch (e) {
      console.log(e);
    }
  };

  // login api call
  const handleLogin = (val) => {
    dispatch(login(val));
  };

  useEffect(() => {
    if (data.status === true) {
      storeToken(data?.access_token);
      if (data.user?.role === "user") {
        navigation.navigate("HomeTabs");
      } else {
        navigation.navigate("Tabs");
      }
    }
  }, [isSuccess]);

  // validation schema
  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validateOnMount={true}
      onSubmit={(val) => console.log(val)}
      validationSchema={formValidationSchema}
    >
      {({ handleChange, handleBlur, values, touched, errors, isValid }) => (
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
              <Text style={styles.text}>Login</Text>
              <View>
                <Input
                  placeholder="Email id"
                  containerStyle={{ height: 50 }}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  leftIcon={
                    <Icon
                      name="alternate-email"
                      type="material"
                      size={20}
                      color="black"
                    />
                  }
                  style={{ fontSize: 14 }}
                />
                {errors.email && touched.email && (
                  <Text style={tw`text-red-600 ml-2`}>{errors.email}</Text>
                )}
                <Input
                  placeholder="Password"
                  containerStyle={{ height: 50 }}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  leftIcon={
                    <Icon
                      name="lock"
                      type="fontawesome"
                      size={20}
                      color="black"
                    />
                  }
                  secureTextEntry={showPassword}
                  rightIcon={
                    <Icon
                      name={showPassword ? "eye-off" : "eye"}
                      type="feather"
                      size={20}
                      color="black"
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={{ fontSize: 14 }}
                />
                {errors.password && touched.password ? (
                  <Text style={tw`text-red-600 ml-2`}>{errors.password}</Text>
                ) : message == "Login successful" ? (
                  <Text style={tw`text-green-600 ml-2`}>{message}</Text>
                ) : (
                  <Text style={tw`text-red-600 ml-2`}>{message}</Text>
                )}
              </View>
              <Text
                style={tw`text-right text-sm text-gray-400 mt-2 mb-3 `}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                Forgot Password?
              </Text>
              <Button
                disabled={!isValid}
                title="Login"
                onPress={() => {
                  handleLogin(values);
                }}
              />
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

          {/* progress loader */}
          <Loader loading={isFetching} />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  grayBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "gray",
  },
});
