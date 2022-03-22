import { StyleSheet } from "react-native";
import React from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import UserBooking from "./UserBooking";

const Pending = () => {
  return (
    <SafeAreaView style={tw`px-5 h-full`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Booking /> */}
        <UserBooking pending="pending"/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pending;

const styles = StyleSheet.create({});
