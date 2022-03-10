import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  getValues,
  salonSelector,
} from "../../../../redux/slices/salon/salonSlice";
import HairTypeDropdown from "./HairTypeDropdown";
import SalonTypeDropdown from "./SalonTypeDropdown";

const SalonDetails = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const { hairDresserData, updateSalonData } = useSelector(salonSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getValues({
        ...updateSalonData,
        name: name || hairDresserData?.name,
        price: price || hairDresserData?.price,
        location: location || hairDresserData?.location,
      })
    );
  }, [name, price, location, hairDresserData]);

  return (
    <>
      <View>
        <View>
          <Text style={tw`ml-5`}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setName(newText)}
            defaultValue={name || hairDresserData?.name}
            placeholder="Name"
            keyboardType="default"
          />
        </View>
        <View>
          <Text style={tw`ml-5`}>Hair type</Text>
          <HairTypeDropdown />
        </View>
        <View>
          <Text style={tw`ml-5`}>Salon Type</Text>
          <SalonTypeDropdown />
        </View>

        <View>
          <Text style={tw`ml-5`}>Price</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setPrice(newText)}
            // defaultValue={hairDresserData?.price.toString() || price.toString()}
            placeholder="Price"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={tw`ml-5`}>Location</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setLocation(newText)}
            defaultValue={hairDresserData?.location || location}
            placeholder="Location"
          />
        </View>
      </View>
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
