import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Icon } from "react-native-elements";

const SaloonFeatures = () => {
  return (
    <View style={tw`my-5`}>
      <Text style={tw`font-bold text-xl`}>Saloon Features</Text>
      <View
        style={{
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      >
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Text style={tw`text-xl`}>Year</Text>
          <Text style={tw`text-xl`}>2012</Text>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Text style={tw`text-xl`}>Condition</Text>
          <Text style={tw`text-xl`}>2012</Text>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Text style={tw`text-xl`}>Description</Text>
          <Text style={tw`text-xl`}>Perfect</Text>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-5`}>
          <Text style={tw`text-xl`}>Location</Text>
          <Text style={tw`text-xl`}>2012</Text>
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
        <Text style={tw`font-bold text-xl`}>Option</Text>
        <View style={tw`flex flex-row mt-5`}>
          <Icon name="dry-cleaning" type="material" size={20} color="#000" />
          <Text style={tw`text-xl ml-2`}>Air Dryer</Text>
        </View>
      </View>
      {/* Option section end */}
      <View style={tw`mt-10  w-full`}>
        <Button
          title="Book"
          titleStyle={{ marginLeft: 10 }}
          icon={
            <Icon name="dry-cleaning" type="material" size={20} color="#fff" />
          }
          iconPosition="left"
        />
      </View>
    </View>
  );
};

export default SaloonFeatures;

const styles = StyleSheet.create({});
