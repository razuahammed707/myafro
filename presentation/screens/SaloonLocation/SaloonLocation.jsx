import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Icon } from "react-native-elements";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const SaloonLocation = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      {/* Top section start */}
      <View
        style={tw`flex flex-row items-center justify-between px-5 py-4 border border-gray-200`}
      >
        <Icon name="arrow-left" type="feather" size={28} color="black" onPress={() => navigation.goBack()}/>
        <View style={tw`flex flex-row items-center`}>
          <Text style={tw`font-bold text-lg`}>Theresa Webb</Text>
        </View>
        <View>
          <Text style={tw`text-base`}>Help</Text>
        </View>
      </View>
      {/* Top section end */}

      {/* Profile info sectio start */}
      <View style={tw`flex flex-row items-center p-5`}>
        <Image
          style={{
            width: 36,
            height: 36,
          }}
          source={require("../../../assets/img/profile.png")}
          resizeMode="contain"
        />
        <View style={tw`ml-4`}>
          <View style={tw`flex flex-row`}>
            <Text style={tw`font-bold text-lg mr-2`}>Theresa Webb</Text>
          </View>
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`text-sm`}>DR86548</Text>
          </View>
        </View>
      </View>
      {/* Profile info sectio end */}

      {/* start end section start */}
      <View style={tw`flex flex-row items-center justify-between px-5`}>
        <View>
          <Text style={tw`text-sm text-gray-400`}>Start</Text>
          <Text style={tw`text-sm`}>23. des kl. 18:00</Text>
        </View>
        <View>
          <Text style={tw`text-sm text-gray-400`}>Slutt</Text>
          <Text style={tw`text-sm`}>3. des kl. 23:00</Text>
        </View>
        <Icon name="alert-circle" type="feather" size={20} color="#ed2929" />
      </View>
      {/* start end section end */}

      {/* Saloon location sectio start */}
      <View style={tw`px-5 mt-5`}>
        <View style={tw`flex flex-row mt-5`}>
          <Icon
            name="alert-triangle"
            type="feather"
            size={20}
            color="#ffc727"
          />
          <Text style={tw`text-lg ml-2`}>Saloon location</Text>
        </View>
        <View style={tw`my-5`}>
          <Text style={tw`text-sm text-gray-600 ml-1`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <View style={tw` w-full`}>
            <Button
            onPress={() => navigation.navigate('SaloonOption')}
              title="Book"
              type="clear"
              titleStyle={{ marginLeft: 10 }}
              icon={
                <Icon
                  name="dry-cleaning"
                  type="material"
                  size={20}
                  color="#fff"
                />
              }
              iconPosition="left"
            />
          </View>
        </View>
        <View style={tw`mt-5`}>
        <Text style={tw`font-bold text-lg mr-2`}>Saloon location</Text>
          <View
            // style={{
            //   borderBottomColor: "lightgray",
            //   borderBottomWidth: 1,
            //   paddingBottom: 10,
            // }}
          >
            <View style={tw`flex flex-row justify-between items-center mt-5`}>
              <Text style={tw`text-base font-normal`}>Home Saloon</Text>
              <Text style={tw`text-sm text-gray-400`}>kr6355</Text>
            </View>
            <View style={tw`flex flex-row justify-between items-center mt-5`}>
              <Text style={tw`text-base`}>Home Saloon</Text>
              <Text style={tw`text-sm text-gray-400`}>kr4915</Text>
            </View>
            <View style={tw`flex flex-row justify-between items-center mt-5`}>
              <Text style={tw`text-base`}>Home Saloon</Text>
              <Icon name="alert-circle" type="feather" size={20} color="#000" />
            </View>
            <View style={tw`flex flex-row justify-between items-center mt-5`}>
              <Text style={tw`text-base`}>Home Saloon</Text>
              <View style={tw`flex flex-row items-center`}>
              <Text style={tw`text-lg mr-2`}>kr1440</Text>
              <Icon name="alert-circle" type="feather" size={20} color="#000" />
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Saloon location sectio end */}
    </SafeAreaView>
  );
};

export default SaloonLocation;

const styles = StyleSheet.create({});
