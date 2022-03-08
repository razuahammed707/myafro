import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import DropdownComponent from "../../../components/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  getValues,
  salonSelector,
} from "../../../../redux/slices/salon/salonSlice";

const SalonDetails = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const { data, getSalonData, isSuccess } = useSelector(salonSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getValues({
        ...getSalonData,
        name: name || data?.salon?.name,
        price: price || data?.salon?.price,
        location: location || data?.salon?.location,
      })
    );
  }, [name, price, location]);

  return (
    <>
      {isSuccess && (
        <View>
          <View>
            <Text style={tw`ml-5`}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(newText) => setName(newText)}
              defaultValue={name || data?.salon?.name}
              placeholder="Name"
              keyboardType="default"
            />
          </View>
          <Text style={tw`ml-5`}>Category</Text>
          <DropdownComponent text="category" />
          <View>
            <Text style={tw`ml-5`}>Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={(newText) => setPrice(newText)}
              defaultValue={data?.salon?.price.toString() || price.toString()}
              placeholder="Price"
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={tw`ml-5`}>Location</Text>
            <TextInput
              style={styles.input}
              onChangeText={(newText) => setLocation(newText)}
              defaultValue={data?.salon?.location || location}
              placeholder="Location"
            />
          </View>
        </View>
      )}
    </>
  );
};

export default SalonDetails;

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
