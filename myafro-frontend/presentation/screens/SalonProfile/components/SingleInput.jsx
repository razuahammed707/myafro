import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon, Input } from "react-native-elements";
import tw from 'twrnc'

const SingleInput = () => {
  return (
    <View style={tw`px-5`}>
      <Input
        placeholder="Optional"
        containerStyle={{
          height: 50,
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}
        leftIcon={<Icon name="edit-3" type="feather" size={16} color="black" />}
        style={{ fontSize: 14 }}
      />
    </View>
  );
};

export default SingleInput;

const styles = StyleSheet.create({});
