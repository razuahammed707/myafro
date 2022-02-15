import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import BottomBar from "../../components/BottomBar/BottomBar";

const Request = () => {
  return (
    <SafeAreaView style={tw`p-5 h-full`}>
      <Text style={tw`font-bold text-xl mr-2`}>Request Screen</Text>
      <View style={tw`py-4 flex flex-row items-center justify-between mt-2`}>
        <View style={tw`flex flex-row items-center`}>
          <Image
            style={{
              width: 36,
              height: 36,
            }}
            source={require("../../../assets/img/profile.png")}
            resizeMode="contain"
          />
          <View style={tw`ml-4 w-60`}>
            <View>
              <Text style={tw`font-bold text-xl mr-2`}>Theresa Webb</Text>
              <View style={tw`flex flex-row items-center my-1`}>
                <Text style={tw`text-gray-400 mr-2`}>23. des 2021</Text>
                <Icon
                  name="arrow-right"
                  type="feather"
                  size={20}
                  color="gray"
                />
                <Text style={tw`text-gray-400 ml-2`}>23. des 2021</Text>
              </View>
            </View>
            <View style={tw`flex flex-row`}>
              <Text>Lorem ipsum dolor sit.</Text>
            </View>
          </View>
        </View>
        <View>
          <Icon
            name="arrow-forward-ios"
            type="material"
            size={20}
            color="gray"
          />
        </View>
      </View>
      <BottomBar name1="Request" name2="Bookings" name3="Account"/>
    </SafeAreaView>
  );
};

export default Request;

const styles = StyleSheet.create({});
