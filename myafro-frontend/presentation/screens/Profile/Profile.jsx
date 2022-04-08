import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { AirbnbRating, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={tw`py-5 mt-4 h-full`}>
      {/* Top section start */}
      <View style={tw`flex flex-row items-center justify-between px-5`}>
        <Icon name="arrow-left" type="feather" size={28} color="black" onPress={() => navigation.goBack()}/>
        <View style={tw`flex flex-row items-center`}>
          <Text style={tw`font-bold text-base`}>Theresa Webb</Text>
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
        <View>
          <Text style={tw`font-bold text-lg`}>kr259</Text>
        </View>
      </View>
      {/* Top section end */}

      {/* Owner section start */}
      <View style={tw`mt-5 px-5`}>
        <Text style={tw`text-base`}>Owner</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SaloonLocation')}
        style={tw`py-4 flex flex-row border items-center justify-between border-gray-200 px-5 mt-3`}
      >
        <View style={tw`flex flex-row items-center`}>
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
              <Text style={tw`font-bold text-base mr-2`}>Theresa Webb</Text>
              <Icon name="verified" type="material" size={20} color="#30a8f8" />
            </View>
            <View style={tw`flex flex-row items-center`}>
              <AirbnbRating
                count={5}
                reviews={[]}
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
          </View>
        </View>
        <Icon name="arrow-right" type="feather" size={20} color="black" />
      </TouchableOpacity>
      {/* Owner section end  */}

      {/* location section start */}
      <View style={tw`p-5`}>
        <Text style={tw`font-bold text-lg`}>Saloon location</Text>
        <View style={tw`flex flex-row justify-start mt-4`}>
          <Icon name="location-pin" type="entypo" size={28} color="black" />
        </View>
        <View style={tw`mt-5 flex flex-row justify-between`}>
          <Image source={require("../../../assets/img/map.png")} />
          <View>
            <Text style={tw`text-sm`}>Lorem ipsum dolor sit amet,</Text>
            <Text style={tw`text-sm`}>consectetur adipiscing elit.</Text>
          </View>
        </View>
      </View>
      {/* location section end */}

      {/* Option section start */}
      <View style={tw`p-5`}>
        <Text style={tw`font-bold text-lg`}>Option</Text>
        <View style={tw`flex flex-row mt-5`}>
          <Icon name="dry-cleaning" type="material" size={20} color="#000" />
          <Text style={tw`text-lg ml-2`}>Air Dryer</Text>
        </View>
      </View>
      {/* Option section end */}
      <View style={tw`absolute bottom-10 w-full`}>
        <Button
          title="Book"
          titleStyle={{ marginLeft: 10 }}
          icon={
            <Icon name="dry-cleaning" type="material" size={20} color="#fff" />
          }
          iconPosition="left"
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
