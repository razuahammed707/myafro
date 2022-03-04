import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";
import { Formik } from "formik";
import Loader from "../../components/Loader/Loader";
import axiosClient from "../../../config/base";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formValidationSchema = yup.object().shape({
    credential: yup
      .string()
      .required("Email or mobile number is required"),
  });

  // storing token to web storage
  const storeFogotCredentials = async (val) => {
    try {
      await AsyncStorage.setItem("forgot_cred", val);
    } catch (e) {
      console.log(e);
    }
  };

  const handleForgotPassword = async (val) => {
    setLoading(true);
    axiosClient
      .post("/forgot", JSON.stringify(val))
      .then((res) => {
        console.log(res.data)
        res.data.status === false ? setLoading(false) : setLoading(false);
        if (res.data.status === true) {
          storeFogotCredentials(res.data?.credential);
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
      initialValues={{ credential: "" }}
      validateOnMount={true}
      // onSubmit={(val) => console.log(val)}
      validationSchema={formValidationSchema}
    >
      {({ handleChange, handleBlur, values, touched, errors, isValid }) => (
        <SafeAreaView style={tw`p-5 bg-white`}>
          <View style={tw`flex flex-row justify-start`}>
            <Icon
              name="arrow-left"
              type="feather"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
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
              <Input
                onChangeText={handleChange("credential")}
                onBlur={handleBlur("credential")}
                value={values.credential}
                containerStyle={{ height: 60 }}
                placeholder="Email ID / Mobile number"
                style={{ fontSize: 14 }}
              />
              {errors.credential && touched.credential ? (
                <Text style={tw`text-red-600 ml-2`}>{errors.credential}</Text>
              ) : message == "Otp has been sent to your email" ? (
                <Text style={tw`text-green-600 ml-2`}>{message}</Text>
              ) : (
                <Text style={tw`text-red-600 ml-2`}>{message}</Text>
              )}
            </View>

            <Button
              title="Submit"
              disabled={!isValid}
              onPress={() => {
                handleForgotPassword(values);
              }}
            />
          </View>
          {<Loader loading={loading} />}
        </SafeAreaView>
      )}
    </Formik>
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
