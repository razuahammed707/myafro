import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Booking from "./UserBooking";
import tw from "twrnc";
import { ScrollView } from "react-native-gesture-handler";
import UserBooking from "./UserBooking";

const Previous = () => {
  return (
    <SafeAreaView style={tw`px-5 h-full`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Booking /> */}
        <UserBooking previous="previous"/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Previous;

const styles = StyleSheet.create({});
