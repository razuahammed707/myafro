import { View, Text, Image } from "react-native";
import React from "react";
import tw from 'twrnc'

const UserCarouselItem = ({ item }) => {
  return (
    <View>
      <Image
        style={{ width: "100%", height:200 }}
        resizeMode="cover"
        source={{uri:item?.img_url}}
      />
    </View>
  );
};

export default UserCarouselItem;
