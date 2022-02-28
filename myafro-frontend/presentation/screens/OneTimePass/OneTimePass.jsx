import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Button, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { useEffect } from "react";
import axiosClient from "../../../config/base";
import Loader from "../../components/Loader/Loader";

let newInputIndex = 0;
const OneTimePass = () => {
  const navigation = useNavigation();
  const inputs = Array(4).fill("");
  const input = useRef();
  const [message, setMessage] = useState("");
  const [OTP, setOTP] = useState({ 0: "", 1: "", 2: "", 3: "" });
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextInputIndex, setInputIndex] = useState(0);

  useEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);

  // checking the object is valid or not
  const isObjectValid = (val) => {
    return Object.values(val).every((val) => val.trim());
  };

  // get input values
  const handleChangeText = (text, index) => {
    const newOTP = { ...OTP };
    newOTP[index] = text;
    setOTP(newOTP);

    const lastInputIndex = inputs.length - 1;
    if (!text) {
      newInputIndex = index === 0 ? 0 : index - 1;
      return newInputIndex;
    } else {
      newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
      setInputIndex(newInputIndex);
      return newInputIndex;
    }
  };

  // storing token to web storage
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("pass_token", token);
    } catch (e) {
      console.log(e);
    }
  };

  // get data from web storage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user_info");
      if (value !== null) {
        const parsedVal = JSON.parse(value);
        if (parsedVal.mobile) setMobile(parsedVal.mobile);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData()
  }, [])

  // submit otp with verify api call
  const submitOTP = () => {
    setLoading(true);
    getData();
    let inputOTP = "";
    if (isObjectValid(OTP)) {
      Object.values(OTP).forEach((val) => {
        inputOTP += val;
      });
    }
    const data = {
      mobile: mobile,
      otp: inputOTP,
    };
    axiosClient
      .post("/verify", JSON.stringify(data))
      .then((res) => {
        res.data.status === false ? setLoading(false) : setLoading(false);
        if (res.data.status === true) {
          storeToken(res.data?.pass_token);
          navigation.navigate("CreatePassword");
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
          source={require("../../../assets/img/otp.png")}
        />
      </View>
      <View style={tw`h-1/1`}>
        <Text style={styles.text}>Enter OTP</Text>
        <Text style={tw`text-sm text-gray-400 text-left mx-2 mb-10`}>
          An 4 digit code has been sent to +{mobile}
        </Text>
        <View style={styles.otpContainer}>
          {inputs.map((i, index) => (
            <View key={index.toString()} style={styles.inputContainer}>
              <TextInput
                placeholder="0"
                value={OTP[index]}
                onChangeText={(text) => handleChangeText(text, index)}
                keyboardType="numeric"
                maxLength={1}
                style={tw`text-lg text-center`}
                ref={nextInputIndex === index ? input : null}
              />
            </View>
          ))}
        </View>
        <View>
          <Text style={tw`text-base font-normal text-center mt-5`}>
            Tap to resend OTP
          </Text>
        </View>
        {message === "User verified" ? <Text style={tw`text-green-600 ml-2 mt-3 text-center`}>{message}</Text> : <Text style={tw`text-red-600 ml-2 mt-3 text-center`}>{message}</Text>}
        <View style={tw`mt-2`}>
          <Button title="Submit" onPress={() => submitOTP()} />
        </View>
      </View>
      <Loader loading={loading} />
    </SafeAreaView>
  );
};

export default OneTimePass;

const { width } = Dimensions.get("window");
const inputWidth = Math.round(width / 6);
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 15,
  },
  grayBorder: {
    height: 1,
    width: "20%",
    backgroundColor: "gray",
  },
  inputContainer: {
    width: inputWidth,
    height: inputWidth,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#222",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  otpContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: inputWidth / 2,
  },
});
