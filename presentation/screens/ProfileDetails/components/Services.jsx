import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from 'twrnc'

const Services = () => {
  return (
    <View style={tw`my-5`}>
      <Text style={tw`font-bold text-base`}>Service Included</Text>
      <View style={tw`flex flex-row justify-between`}>
        <View>
          <View style={tw`flex flex-row mt-5`}>
            <Icon name="verified" type="material" size={20} color="#30a8f8" />
            <Text style={tw`text-lg ml-2`}>Coffee</Text>
          </View>
          <View style={tw`flex flex-row mt-5`}>
            <Icon name="verified" type="material" size={20} color="#30a8f8" />
            <Text style={tw`text-lg ml-2`}>Free wifi</Text>
          </View>
          <View style={tw`flex flex-row mt-5`}>
            <Icon name="verified" type="material" size={20} color="#30a8f8" />
            <Text style={tw`text-lg ml-2`}>Head Massage</Text>
          </View>
        </View>
        <View>
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
        </View>
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
