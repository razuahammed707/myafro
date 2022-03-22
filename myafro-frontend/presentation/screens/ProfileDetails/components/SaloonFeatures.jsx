import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Button, Icon } from "react-native-elements";
import ResponsePopup from "../../../components/ResponsePopup/ResponsePopup";

const SaloonFeatures = ({ features }) => {
  const navigation = useNavigation()
  return (
    <View style={tw`my-5`}>
      <Text style={tw`font-bold text-lg`}>Saloon Features</Text>
      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      >
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Text style={tw`text-lg`}>Year</Text>
          <Text style={tw`text-lg`}>{features?.year}</Text>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Text style={tw`text-lg`}>Condition</Text>
          <Text style={tw`text-lg`}>{features?.condition}</Text>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Text style={tw`text-lg`}>License</Text>
          <Text style={tw`text-lg`}>{features?.license}</Text>
        </View>
      </View>
      {/* Option section start */}
      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          paddingBottom: 25,
          marginTop: 25,
        }}
      >
        <Text style={tw`font-bold text-lg`}>Option</Text>
        <View style={tw`flex flex-row mt-5`}>
          <Icon name="dry-cleaning" type="material" size={20} color="#000" />
          <Text style={tw`text-lg ml-2`}>Air Dryer</Text>
        </View>
      </View>
      {/* Option section end */}
      {/* <ResponsePopup /> */}
      <View style={tw`mt-10  w-full`}>
        <Button
          title="Book"
          type="clear"
          titleStyle={{ marginLeft: 10 }}
          icon={
            <Icon name="dry-cleaning" type="material" size={20} color="#fff" />
          }
          iconPosition="left"
          onPress={() => navigation.navigate('BookingConfirmation')}
        />
      </View>
    </View>
  );
};

export default SaloonFeatures;

const styles = StyleSheet.create({});
