import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Button, Icon } from "react-native-elements";

const CurrentHair = () => {
  return (
    <SafeAreaView style={tw`p-5`}>
      <Text style={tw`font-bold text-xl`}>Current Hair</Text>
      <View style={tw`my-5`}>
        <Image
          style={{ width: "100%" }}
          source={require("../../../assets/img/current.png")}
        />
        <View style={tw`my-5 flex flex-row items-center justify-between`}>
          <Button
            title="Accept"
            buttonStyle={{
              paddingHorizontal: 10,
              paddingVertical: 16,
              backgroundColor: "#4caf50",
              width: "87%",
            }}
            type="clear"
            titleStyle={{ fontSize: 16 }}
          />
          <Button
            title="Decline"
            buttonStyle={{
              paddingHorizontal: 10,
              paddingVertical: 16,
              backgroundColor: "#ed2929",
              width: "87%",
            }}
            type="clear"
            titleStyle={{ fontSize: 16 }}
          />
        </View>

        {/* Message section start */}
        <View>
          <Text style={tw`font-bold text-xl mb-5`}>Message</Text>
          <View style={tw`flex flex-row justify-between`}>
            <View style={tw`p-5 bg-black rounded-lg`}>
              <Text style={tw`text-white text-lg w-60`}>
                Lorem ipsum dolor sit amet, consecte adipiscing elit.
              </Text>
            </View>
            <View>
              <Image
                style={{
                  width: 36,
                  height: 36,
                }}
                source={require("../../../assets/img/profile.png")}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        {/* Message section end */}

        {/* Option section start */}
        <View style={tw`flex flex-row items-center justify-between my-5`}>
        <Text style={tw`font-bold text-xl mb-5`}>Option</Text>
        <Icon name="arrow-forward-ios" type="material" size={20} color="gray" />
        </View>
        {/* Option section end */}
      </View>
    </SafeAreaView>
  );
};

export default CurrentHair;

const styles = StyleSheet.create({});
