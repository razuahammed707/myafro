import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  getValues,
  salonSelector,
} from "../../../../redux/slices/salon/salonSlice";
import CountryDropdown from "./CountryDropdown";

const ContactDetails = () => {
  const { hairDresserData, updateSalonData } = useSelector(salonSelector);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();

  // const {mobile} = loggedInUserData?.user

  useEffect(() => {
    dispatch(
      getValues({
        ...updateSalonData,
        contact: {
          address: address || hairDresserData?.contact?.address,
          mobile: mobile || hairDresserData?.contact?.mobile,
        },
      })
    );
  }, [address, mobile]);

  return (
      <View>
        <View>
          <Text style={tw`ml-5`}>Mobile</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setMobile(newText)}
            defaultValue={hairDresserData?.contact?.mobile || mobile}
            placeholder="Mobile"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={tw`ml-5`}>Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setAddress(newText)}
            defaultValue={hairDresserData?.contact?.address || address}
            placeholder="Address"
          />
        </View>
        <Text style={tw`ml-5`}>Country</Text>
        <CountryDropdown />
        {/* <DropdownComponent text="country" /> */}
      </View>
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
