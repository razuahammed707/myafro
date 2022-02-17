import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const CurrentHair = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`p-5`}>
      <View style={tw`flex flex-row`}>
        <Icon
          name="arrow-left"
          type="feather"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={tw`font-bold text-lg ml-2`}>Current Hair</Text>
      </View>
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
            titleStyle={{ fontSize: 14 }}
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
            titleStyle={{ fontSize: 14 }}
          />
        </View>

        {/* Message section start */}
        <Text style={tw`font-bold text-lg mb-5`}>Message</Text>
        <View style={tw`flex flex-row justify-between`}>
          <View style={tw`p-5 bg-black rounded-lg`}>
            <Text style={tw`text-white text-lg w-60 text-base`}>
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
        {/* Message section end */}

        {/* Option section start */}
        <View style={tw`flex flex-row items-center justify-between my-5`}>
          <Text style={tw`font-bold text-lg mb-5`}>Option</Text>
          <Icon
            name="arrow-forward-ios"
            type="material"
            size={20}
            color="gray"
          />
        </View>
        {/* Option section end */}
      </View>
    </SafeAreaView>
  );
};

export default CurrentHair;

const styles = StyleSheet.create({});
