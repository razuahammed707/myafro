import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Booking from "./Booking";
import tw from "twrnc";
import { ScrollView } from "react-native-gesture-handler";

const PreviousBookings = () => {
  return (
    <SafeAreaView style={tw`px-5 h-full`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Booking /> */}
        <Booking previous="previous"/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreviousBookings;

const styles = StyleSheet.create({});
