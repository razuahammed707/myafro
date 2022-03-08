import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import FeaturesPopup from "./FeaturesPopup";
import { getValues, salonSelector } from "../../../../redux/slices/salon/salonSlice";
import { useDispatch, useSelector } from "react-redux";

const Features = () => {
  const {getSalonData} = useSelector(salonSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getValues({...getSalonData, country: 5, location: 'dhaka'}))
  }, [])
  return (
    <View style={tw`px-5`}>
      <FeaturesPopup />
      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      >
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Text style={tw`text-base`}>Year</Text>
          <Text style={tw`text-base`}>2012</Text>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Text style={tw`text-base`}>Condition</Text>
          <Text style={tw`text-base`}>Perfect</Text>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Text style={tw`text-base`}>License</Text>
          <Text style={tw`text-base`}>2012</Text>
        </View>
      </View>
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({});
