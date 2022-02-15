import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Booking from "./Booking";
import tw from 'twrnc'

const PreviousBookings = () => {
  return (
    <SafeAreaView style={tw`px-5 h-full`}>
      <Booking />
      <Booking margin="mt-5" />
      <Booking margin="mt-5" />
    </SafeAreaView>
  );
};

export default PreviousBookings;

const styles = StyleSheet.create({});
