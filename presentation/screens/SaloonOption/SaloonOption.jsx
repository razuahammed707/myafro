import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const SaloonOption = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        {/* Top section start */}
        <View
          style={tw`flex flex-row items-center justify-between px-5 py-4 border border-gray-200`}
        >
          <Icon
            name="arrow-left"
            type="feather"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`font-bold text-lg`}>Theresa Webb</Text>
          </View>
          <View>
            <Text style={tw`text-base`}>Help</Text>
          </View>
        </View>
        {/* Top section end */}

        {/* Owner section start */}
        <View>
          <View
            style={tw`flex flex-row justify-between items-center mt-5 px-5 pb-5 border-gray-200 border-b-2`}
          >
            <Text style={tw`text-base`}>Owner</Text>
            <Icon name="alert-circle" type="feather" size={20} color="#000" />
          </View>
          <View
            style={tw`flex flex-row justify-between items-center mt-5 px-5 pb-5 border-gray-200 border-b-2`}
          >
            <Text style={tw`text-base`}>Owner</Text>
            <View style={tw`flex flex-row items-center`}>
              <Text style={tw`text-base mr-2`}>kr1440</Text>
              <Icon name="alert-circle" type="feather" size={20} color="#000" />
            </View>
          </View>
        </View>
        {/* Owner section end  */}

        {/* Message section start */}
        <View style={tw`my-8 px-5`}>
          <Text style={tw`font-bold text-lg mb-5`}>Message</Text>
          <View style={tw`flex flex-row justify-between`}>
            <View style={tw`p-5 bg-black rounded-lg`}>
              <View style={tw`flex flex-row items-center justify-between`}>
                <Text style={tw`text-white text-lg mb-3`}>Meg</Text>
                <Text style={tw`text-white text-lg mb-3`}>Meg</Text>
              </View>
              <Text style={tw`text-white text-sm w-60`}>
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
        <View style={tw`flex flex-row items-center justify-between my-5 px-5`}>
          <Text style={tw`text-lg`}>Option</Text>
          <Icon
            name="arrow-forward-ios"
            type="material"
            size={20}
            color="gray"
          />
        </View>
        {/* Option section end */}

        {/* Saloon option start */}
        <View style={tw`my-7 px-5`}>
          <Text style={tw`font-bold text-lg`}>Saloon location</Text>
        </View>
        {/* Saloon option end */}

        <View
          style={tw`py-4 flex flex-row border items-center justify-between border-gray-200 px-5`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Image
              style={{
                width: 36,
                height: 36,
              }}
              source={require("../../../assets/img/a2.png")}
              resizeMode="contain"
            />
            <View style={tw`ml-4`}>
              <View style={tw`flex flex-row`}>
                <Text style={tw`text-base mr-2`}>Home Saloon</Text>
              </View>
              <Text style={tw`text-gray-400 text-sm`}>
                Lorem ipsum dolor sit amet.
              </Text>
            </View>
          </View>
          <Icon
            name="arrow-forward-ios"
            type="material"
            size={20}
            color="gray"
          />
        </View>
        <View
          style={tw` flex flex-row items-center justify-between border-gray-200 border-b-2  px-5 pb-3 mt-3`}
        >
          <View style={tw`flex flex-row items-center`}>
            <Image
              style={{
                width: 36,
                height: 36,
              }}
              source={require("../../../assets/img/a1.png")}
              resizeMode="contain"
            />
            <View style={tw`ml-4`}>
              <View style={tw`flex flex-row`}>
                <Text style={tw`text-lg mr-2`}>Home Saloon</Text>
              </View>
              <Text style={tw`text-gray-400 text-sm`}>
                Lorem ipsum dolor sit amet.
              </Text>
            </View>
          </View>
          <Icon
            name="arrow-forward-ios"
            type="material"
            size={20}
            color="gray"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SaloonOption;

const styles = StyleSheet.create({});
