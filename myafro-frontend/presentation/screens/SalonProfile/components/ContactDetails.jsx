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
  const { data, getSalonData, isFetching } = useSelector(salonSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getValues({ ...getSalonData }));
  }, []);
  
  return (
    <>
      {!isFetching && (
        <View>
          <View>
            <Text style={tw`ml-5`}>Mobile</Text>
            <TextInput
              style={styles.input}
              // onChangeText={onChangeNumber}
              value={data?.salon?.user.mobile}
              placeholder="Mobile"
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={tw`ml-5`}>Address</Text>
            <TextInput
              style={styles.input}
              // onChangeText={onChangeNumber}
              // value={number}
              placeholder="Address"
            />
          </View>
          <Text style={tw`ml-5`}>Country</Text>
          <DropdownComponent text="country" />
        </View>
      )}
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
