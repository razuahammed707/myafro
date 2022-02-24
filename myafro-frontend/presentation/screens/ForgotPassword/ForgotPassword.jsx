import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

const ForgotPassword = () => {
  const navigation = useNavigation();

  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
  });

  const testingApi = (val) => {
    console.log(val);
  };
  return (
    <Formik
      initialValues={{ email: "" }}
      validateOnMount={true}
      // onSubmit={(val) => console.log(val)}
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
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email ID / Mobile number"
                style={{ fontSize: 14 }}
              />
              {errors.email && touched.email && <Text>{errors.email}</Text>}
            </View>

            <Button
              title="Submit"
              disabled={!isValid}
              onPress={() => {
                testingApi(values);
              }}
            />
          </View>
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
