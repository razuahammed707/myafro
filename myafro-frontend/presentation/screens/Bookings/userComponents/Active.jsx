import { StyleSheet, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { ScrollView } from "react-native-gesture-handler";
import UserBooking from "./UserBooking";

const Active = () => {
  return (
    <TouchableOpacity style={tw`px-5 h-full`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Booking /> */}
        <UserBooking booked="booked"/>
      </ScrollView>
    </TouchableOpacity>
  );
};

export default Active;

const styles = StyleSheet.create({});
