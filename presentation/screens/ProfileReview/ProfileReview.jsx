import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AirbnbRating, Icon } from "react-native-elements";
import Feedback from "./components/Feedback";

const ProfileReview = () => {
  return (
    <SafeAreaView>
        {/* Top section start */}
      <View style={tw`flex flex-row items-center justify-between p-5`}>
          <Text style={tw`font-bold text-xl`}>Theresa Webb Expert</Text>
        <View style={tw`flex flex-row items-center`}>
          <AirbnbRating
            count={5}
            reviewSize={0}
            defaultRating={5}
            size={13}
            starContainerStyle={{
              marginTop: -20,
              marginLeft: 5,
              marginRight: 5,
            }}
          />
          <Text style={tw`text-gray-400`}>307</Text>
        </View>
      </View>
      {/* Top section end */}
      <ScrollView>
        <View style={tw`flex items-center flex-row justify-center my-6`}>
          <View>
            <Image
              source={require("../../../assets/img/profilelg.png")}
              resizeMode="cover"
            />
            <View style={tw`mt-3`}>
              <View style={tw`flex flex-row`}>
                <Text style={tw`font-bold text-xl mr-2`}>Theresa Webb</Text>
                <Icon
                  name="verified"
                  type="material"
                  size={20}
                  color="#30a8f8"
                />
              </View>
              <View style={tw`flex flex-row items-center justify-center`}>
                <AirbnbRating
                  count={5}
                  reviewSize={0}
                  defaultRating={5}
                  size={13}
                  starContainerStyle={{
                    marginTop: -20,
                    marginRight: 5,
                  }}
                />
                <Text style={tw`text-gray-400`}>307</Text>
              </View>
              <Text style={tw`text-gray-400 text-lg text-center`}>
                16 Saloons
              </Text>
            </View>
          </View>
        </View>

        {/* Profile bio section start here  */}
        <View style={tw`px-5`}>
          <Text style={tw`text-gray-400 text-lg`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci,
            consequat sem molestie et, montes, pellentesque. Id sit vulputate
            mattis magna pellentesque convallis. Mattis donec elit .
          </Text>
        </View>
        {/* Profile bio section end here  */}

        {/* Account creation info start here */}
        <View>
          <View style={tw`px-5 my-7`}>
            <View
              style={tw`flex flex-row justify-between items-center mt-5 border-gray-200 border-b-2 pb-5`}
            >
              <Text style={tw`text-xl font-normal`}>Professional Owner</Text>
              <Icon name="alert-circle" type="feather" size={20} color="#000" />
            </View>
            <View style={tw`flex flex-row justify-between items-center mt-5`}>
              <Text style={tw`text-xl`}>Member Since</Text>
              <Text style={tw`text-base text-gray-400`}>16/02/2021</Text>
            </View>
          </View>
        </View>
        {/* Account creation info end here */}

        {/* Profile details section start */}
        <Feedback />
        <Feedback />
        <Feedback />
        <Feedback />
        <Feedback />
        <Feedback />
        {/* Profile details section end */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileReview;

const styles = StyleSheet.create({});
