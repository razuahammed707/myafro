import React, { useEffect, useState } from "react";
import { Button, Overlay, Icon, Input } from "react-native-elements";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import { getValues, salonSelector } from "../../../../redux/slices/salon/salonSlice";
import { useDispatch, useSelector } from "react-redux";

const FeaturesPopup = () => {
  const [visible, setVisible] = useState(false);
  const [year, setYear] = useState('')
  const [condition, setCondition] = useState('')
  const [license, setLicense] = useState('')

  const { updateSalonData, hairDresserData } = useSelector(salonSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getValues({
        ...updateSalonData,
        features: {
          ...hairDresserData?.features,
          year: year || hairDresserData?.features?.year,
          condition: condition || hairDresserData?.features?.condition,
          license: license || hairDresserData?.features?.license,
        }
      })
    );
  }, [year, condition, license]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      {/* <Button
        title="Open Overlay"
        onPress={toggleOverlay}
        buttonStyle={styles.button}
      /> */}
      <View
        style={tw`flex flex-row items-center justify-between my-3`}
        
      >
        <Text style={tw`text-base font-bold`}>Features</Text>
        <TouchableOpacity style={tw`flex flex-row items-center`} onPress={toggleOverlay}>
          <Icon
            name="edit-2"
            type="feather"
            color="black"
            size={20}
            iconStyle={{ marginRight: 10 }}
          />
          <Text style="">Edit Feature</Text>
        </TouchableOpacity>
        
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Edit Feature</Text>
        <View>
          <Text style={tw`ml-5`}>Year</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setYear(newText)}
            defaultValue={hairDresserData?.features?.year || year}
            placeholder="Year"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={tw`ml-5`}>Condition</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setCondition(newText)}
            defaultValue={hairDresserData?.features?.condition || condition}
            placeholder="Condition"
          />
        </View>
        <View>
          <Text style={tw`ml-5`}>License</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setLicense(newText)}
            defaultValue={hairDresserData?.features?.license || license}
            placeholder="License"
          />
        </View>
        <Button
          icon={
            <Icon
              name="wrench"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Edit"
          onPress={toggleOverlay}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
  input: {
    height: 40,
    margin: 12,
    width: 300,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 8,
  },
});



export default FeaturesPopup;
