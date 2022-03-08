import React, { useState } from "react";
import { Button, Overlay, Icon, Input } from "react-native-elements";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import tw from "twrnc";

const FeaturesPopup = () => {
  const [visible, setVisible] = useState(false);

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
            name="plus"
            type="feather"
            color="black"
            size={20}
            iconStyle={{ marginRight: 10 }}
          />
          <Text style="">Add Feature</Text>
        </TouchableOpacity>
        
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Add Feature</Text>
        <Input
          placeholder="Year"
          containerStyle={{
            // height: 50,
            width: 300,
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}
          leftIcon={
            <Icon name="edit-3" type="feather" size={16} color="black" />
          }
          style={{ fontSize: 14 }}
        />
        <Input
          placeholder="License"
          containerStyle={{
            // height: 50,
            width: 300,
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}
          leftIcon={
            <Icon name="edit-3" type="feather" size={16} color="black" />
          }
          style={{ fontSize: 14 }}
        />
        <Input
          placeholder="Condition"
          containerStyle={{
            // height: 50,
            width: 300,
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}
          leftIcon={
            <Icon name="edit-3" type="feather" size={16} color="black" />
          }
          style={{ fontSize: 14 }}
        />
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
          title="Add"
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
});

export default FeaturesPopup;
