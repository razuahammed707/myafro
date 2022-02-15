import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "react-native-elements";

const FreelanceBoardScreen = ({ item }) => {
  return (
    <SafeAreaView style={tw`px-5 relative h-full`}>
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`font-bold text-xl text-center`}>{item.title}</Text>
        <Icon name="cross" type="entypo" size={28} color="black" />
      </View>

      {/* conditionally render items start here*/}
      {item.image !== "" ? (
        <View>
          <View style={tw`border-gray-200 border-b-2 pb-5`}>
            <Image
              style={{ width: "100%" }}
              source={item.image}
              resizeMode="cover"
            />
          </View>
          <View>
            <View style={tw`flex flex-row mt-5`}>
              <Icon name="calendar" type="entypo" size={20} color="black" />
              <Text style={tw`text-lg ml-2 w-80`}>{item.rule1}</Text>
            </View>
            <View style={tw`flex flex-row mt-5`}>
              <Icon name="shield" type="feather" size={20} color="black" />
              <Text style={tw`text-lg ml-2 w-80`}>{item.rule2}</Text>
            </View>
            <View style={tw`flex flex-row mt-5`}>
              <Icon name="battery" type="feather" size={28} color="black" />
              <Text style={tw`text-lg ml-2 w-80`}>{item.rule3}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={tw`mt-10`}>
          <View style={tw`flex flex-row items-center justify-between mt-5`}>
            <Text style={tw`text-lg`}>{item.item1}</Text>
            <View style={tw`flex flex-row justify-between items-center`}>
              <Text style={tw`text-lg mr-2 text-gray-400`}>
                {item.item1_val}
              </Text>
              <Icon
                name="arrow-forward-ios"
                type="material"
                size={20}
                color="gray"
              />
            </View>
          </View>
          <View style={tw`flex flex-row items-center justify-between mt-5`}>
            <Text style={tw`text-lg`}>{item.item2}</Text>
            <View style={tw`flex flex-row justify-between items-center`}>
              <Text style={tw`text-lg mr-2 text-gray-400`}>
                {item.item2_val}
              </Text>
              <Icon
                name="arrow-forward-ios"
                type="material"
                size={20}
                color="gray"
              />
            </View>
          </View>
          <View style={tw`flex flex-row items-center justify-between mt-5`}>
            <Text style={tw`text-lg`}>{item.item3}</Text>
            <View style={tw`flex flex-row justify-between items-center`}>
              <Text style={tw`text-lg mr-2 text-gray-400`}>
                {item.item3_val}
              </Text>
              <Icon
                name="arrow-forward-ios"
                type="material"
                size={20}
                color="gray"
              />
            </View>
          </View>
          <View style={tw`flex flex-row items-center justify-between mt-5`}>
            <Text style={tw`text-lg`}>{item.item4}</Text>
            <View style={tw`flex flex-row justify-between items-center`}>
              <Text style={tw`text-lg mr-2 text-gray-400`}>
                {item.item4_val}
              </Text>
              <Icon
                name="arrow-forward-ios"
                type="material"
                size={20}
                color="gray"
              />
            </View>
          </View>
          <View style={tw`flex flex-row items-center justify-between mt-5`}>
            <Text style={tw`text-lg`}>{item.item5}</Text>
            <View style={tw`flex flex-row justify-between items-center`}>
              <Text style={tw`text-lg mr-2 text-gray-400`}>
                {item.item5_val}
              </Text>
              <Icon
                name="arrow-forward-ios"
                type="material"
                size={20}
                color="gray"
              />
            </View>
          </View>
        </View>
      )}
      {/* conditionally render items end here*/}

      {/* Bottom section start here */}
      {item.image === "" && <View style={tw`absolute bottom-30 w-full left-5`}>
        <View style={tw`flex flex-row justify-center`}>
          <View style={tw`border p-5 rounded-lg border-gray-200`}>
            <View style={tw`flex flex-row justify-center mb-2`}>
              <Icon name="gbp" type="fontisto" size={20} color="gray" />
              <Text style={tw`text-xl text-gray-600 ml-2`}>370</Text>
            </View>
            <View>
              <Text style={tw`text-xl text-gray-600 ml-2`}>
                estimated per month
              </Text>
            </View>
          </View>
        </View>
      </View>}
      {/* Bottom section end here */}
    </SafeAreaView>
  );
};

export default FreelanceBoardScreen;

const styles = StyleSheet.create({});
