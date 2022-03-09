import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import DropdownComponent from "../../../components/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  getValues,
  salonSelector,
} from "../../../../redux/slices/salon/salonSlice";

const ContactDetails = () => {
  const { loggedInUserData, updateSalonData } = useSelector(salonSelector);
  const dispatch = useDispatch();

  // const {mobile} = loggedInUserData?.user

  useEffect(() => {
    dispatch(getValues({ ...updateSalonData, contact: {address: "Testing address", country: "BD"} }));
  }, []);

  // console.log(updateSalonData);
  return (
    <>
      <View>
        <View>
          <Text style={tw`ml-5`}>Mobile</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            value={loggedInUserData?.user?.mobile}
            placeholder="Mobile"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={tw`ml-5`}>Address</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            value={loggedInUserData?.salon?.contact?.address}
            placeholder="Address"
          />
        </View>
        <Text style={tw`ml-5`}>Country</Text>
        <DropdownComponent text="country" />
      </View>
    </>
  );
};

export default ContactDetails;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 8,
  },
});
