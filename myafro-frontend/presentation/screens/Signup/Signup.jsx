import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, CheckBox, Icon, Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axiosClient from "../../../config/base";
import Loader from "../../components/Loader/Loader";

const Signup = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    full_name: yup.string().required("Pleaser enter full name"),
    mobile: yup.string().required("Please enter mobile number"),
  });

  // storing data to web storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user_info", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  // sign up api call
  const handleSignUp = async (val) => {
    setLoading(true);
    let role = check1 ? "user" : "hair_dresser";
    const values = { ...val, role };
    await axiosClient
      .post("/signup", JSON.stringify(values))
      .then((res) => {
        console.log(res.data);
        res.data.status === false ? setLoading(false) : setLoading(false);
        if (res.data.status === true) {
          const values = {
            mobile: res.data.user?.mobile,
            otp: res.data.user?.otp,
          };
          storeData(values);
          navigation.navigate("OTP");
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data);
        err.response.data && setLoading(false);
        setMessage(err.response.data.message);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", full_name: "", mobile: "" }}
      validateOnMount={true}
      onSubmit={(val) => console.log(val)}
      validationSchema={formValidationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
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
                  placeholder="Full name"
                  containerStyle={{ height: 50 }}
                  onChangeText={handleChange("full_name")}
                  onBlur={handleBlur("full_name")}
                  value={values.full_name}
                  leftIcon={
                    <Icon
                      name="user"
                      type="antdesign"
                      size={20}
                      color="black"
                    />
                  }
                  style={{ fontSize: 14 }}
                />
                {errors.full_name && touched.full_name && (
                  <Text style={tw`text-red-600 ml-2`}>{errors.full_name}</Text>
                )}
                <Input
                  placeholder="Mobile number"
                  onChangeText={handleChange("mobile")}
                  onBlur={handleBlur("mobile")}
                  value={values.mobile}
                  leftIcon={
                    <Icon
                      name="phone"
                      type="material"
                      size={20}
                      color="black"
                    />
                  }
                  style={{ fontSize: 14 }}
                  containerStyle={{ height: 50 }}
                />
                {errors.mobile && touched.mobile ? (
                  <Text style={tw`text-red-600 ml-2`}>{errors.password}</Text>
                ) : message == "OTP has been sent. Check your email" ? (
                  <Text style={tw`text-green-600 ml-2`}>{message}</Text>
                ) : (
                  <Text style={tw`text-red-600 ml-2`}>{message}</Text>
                )}
                <Text style={tw`text-gray-600 text-base font-bold ml-2 mt-2`}>
                  Are you?
                </Text>
                <View style={tw`flex items-center flex-row `}>
                  <CheckBox
                    // center
                    containerStyle={{
                      backgroundColor: "white",
                      borderColor: "white",
                      marginLeft: 0,
                    }}
                    checkedColor="#222"
                    title="User"
                    checked={check1}
                    onPress={() => {
                      setCheck2(false);
                      setCheck1(!check1);
                    }}
                  />
                  <CheckBox
                    // center
                    containerStyle={{
                      backgroundColor: "white",
                      borderColor: "white",
                      marginLeft: 0,
                    }}
                    checkedColor="#222"
                    title="Hair Dresser"
                    checked={check2}
                    onPress={() => {
                      setCheck1(false);
                      setCheck2(!check2);
                    }}
                  />
                </View>
                <Text style={tw`text-gray-600 text-sm px-2`}>
                  By signing up, you are agree to our{" "}
                  <Text style={tw`font-bold text-black`}>
                    Terms and Condition and Privacy Policy
                  </Text>
                </Text>
              </View>
              <Button
                disabled={!isValid}
                title="Sign Up"
                onPress={() => {
                  handleSignUp(values);
                }}
              />
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
          <Loader loading={loading} />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Signup;

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
