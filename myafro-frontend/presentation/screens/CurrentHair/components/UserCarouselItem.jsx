import { View, Text, Image } from "react-native";
import React from "react";

const UserCarouselItem = ({ item }) => {
  return (
    <View>
      <Image
        style={{ width: "100%", height:200 }}
        resizeMode="cover"
        source={item.image}
      />
    </View>
  );
};

export default UserCarouselItem;
