import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const Services = ({ services }) => {
  return (
    <View style={tw`my-5`}>
      <Text style={tw`font-bold text-base`}>Service Included</Text>
      <View style={tw`flex flex-row justify-between flex-wrap`}>
        {services?.map((item) => (
          <View key={item._id}>
            <View style={tw`flex flex-row mt-5`}>
              <Icon name="verified" type="material" size={20} color="#30a8f8" />
              <Text style={tw`text-lg ml-2`}>{item?.title}</Text>
            </View>
          </View>
        ))}
        {services?.length < 1 && (
          <View style={tw`flex flex-row justify-center w-full`}>
            <Image
              source={require("../../../../assets/img/notFound.png")}
              height={100}
              resizeMode="cover"
            />
          </View>
        )}
        {/* <View>
          <View style={tw`flex flex-row mt-5`}>
            <Icon name="verified" type="material" size={20} color="#30a8f8" />
            <Text style={tw`text-lg ml-2`}>Wig</Text>
          </View>
          <View style={tw`flex flex-row mt-5`}>
            <Icon name="verified" type="material" size={20} color="#30a8f8" />
            <Text style={tw`text-lg ml-2`}>Free parking</Text>
          </View>
          <View style={tw`flex flex-row mt-5`}>
            <Icon name="verified" type="material" size={20} color="#30a8f8" />
            <Text style={tw`text-lg ml-2`}>Lunch</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
