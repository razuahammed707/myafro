import { StyleSheet } from "react-native";
import React from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import Booking from "./Booking";
import { ScrollView } from "react-native-gesture-handler";

const ActiveBookings = () => {
  return (
    <SafeAreaView style={tw`px-5 h-full`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Booking /> */}
        <Booking />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActiveBookings;

const styles = StyleSheet.create({});
