import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Popup from "./Popup";
import { services } from "../../../../utils/dummyData";
import { Icon } from "react-native-elements";
const SalonServices = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View style={tw`px-5`}>
      <Popup visible={visible} toggleOverlay={toggleOverlay}/>
      <View>
        {services.map((item) => (
          <View
            style={tw`flex flex-row items-center justify-between mt-4`}
            key={item.id}
          >
            <Text style={tw`text-base`}>{item.title}</Text>
            <View style={tw`flex flex-row items-center`}>
              <Icon
                name="edit-2"
                type="feather"
                color="black"
                size={16}
                iconStyle={{ marginRight: 10 }}
                onPress={() => toggleOverlay()}
              />
              <Icon
                name="trash-2"
                type="feather"
                color="black"
                size={16}
                iconStyle={{ marginRight: 10 }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SalonServices;

const styles = StyleSheet.create({});
