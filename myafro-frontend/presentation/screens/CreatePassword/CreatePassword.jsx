import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { Button, Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../components/Loader/Loader";
import axiosClient from "../../../config/base";
import { useEffect } from "react";

const CreatePassword = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  //validation schema
  const formValidationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    confirm_password: yup
      .string()
      .required("Confirm password is also required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  // get token from web storage for creating user
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("pass_token");
      if (value !== null) {
        if (value) setToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  console.log(token);

  // create password for verified user
  const handlePassword = (val) => {
    setLoading(true);
    axiosClient
      .post(`/password/${token}`, JSON.stringify(val))
      .then((res) => {
        console.log(res.data);
        res.data.status === false ? setLoading(false) : setLoading(false);
        if (res.data.status === true) {
          navigation.navigate("Login");
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
      initialValues={{ password: "", confirm_password: "" }}
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
                source={require("../../../assets/img/signup.png")}
              />
            </View>
            <View style={tw`h-1/1`}>
              <Text style={styles.text}>Create Password</Text>
              <View style={tw`mb-5`}>
                <Input
                  placeholder="Password"
                  containerStyle={{ height: 60 }}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  value={values.password}
                  leftIcon={
                    <Icon name="lock" type="feather" size={20} color="black" />
                  }
                  style={{ fontSize: 14 }}
                />
                {errors.password && touched.password && (
                  <Text style={tw`text-red-600 ml-2`}>{errors.password}</Text>
                )}
                <Input
                  placeholder="Confirm Password"
                  containerStyle={{ height: 60 }}
                  onChangeText={handleChange("confirm_password")}
                  onBlur={handleBlur("confirm_password")}
                  value={values.confirm_password}
                  secureTextEntry
                  leftIcon={
                    <Icon name="lock" type="feather" size={20} color="black" />
                  }
                  style={{ fontSize: 14 }}
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <Text style={tw`text-red-600 ml-2`}>{errors.confirm_password}</Text>
                ) : message == "user created successfully" ? (
                  <Text style={tw`text-green-600 ml-2`}>{message}</Text>
                ) : (
                  <Text style={tw`text-red-600 ml-2`}>{message}</Text>
                )}
                <Text style={tw`text-gray-600 text-sm px-2`}>
                  You are one step away to create your account
                </Text>
              </View>
              <Button
                title="Create"
                disabled={!isValid}
                onPress={() =>
                  handlePassword({
                    password: values.password,
                  })
                }
              />
            </View>
          </View>
          <Loader loading={loading} />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default CreatePassword;

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
