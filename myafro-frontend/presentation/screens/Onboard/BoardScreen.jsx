import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

const BoardScreen = ({ item }) => {
  return (
    <SafeAreaView style={tw`p-5`}>
      <View style={tw`h-1/2 mt-2 flex items-center justify-center`}>
        <Image source={item.image} resizeMode="contain" style={{height:294}}/>
      </View>
      <View style={tw`h-1/2`}>
        <Text style={tw`text-center text-xl mb-5`}>{item.title}</Text>
        <Text style={{fontSize: 18, color: "#bdbdbd", lineHeight:25}}>{item.text}</Text>
      </View>
    </SafeAreaView>
  );
};

export default BoardScreen;

const styles = StyleSheet.create({});
