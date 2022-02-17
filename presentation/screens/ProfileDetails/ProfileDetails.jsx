import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AirbnbRating, Icon } from "react-native-elements";
import Services from "./components/Services";
import SaloonFeatures from "./components/SaloonFeatures";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const ProfileDetails = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={tw`p-5`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex flex-row flex-start`}>
          <Icon name="arrow-left" type="feather" size={28} color="black" onPress={() => navigation.goBack()}/>
        </View>
        {/* Image section start */}
        <View style={tw`my-5`}>
          <Image
            style={{ width: "100%" }}
            source={require("../../../assets/img/2.png")}
          />
        </View>
        {/* Image section end */}

        {/* Availavility section start */}
        <View style={tw`flex flex-row justify-between`}>
          <View>
            <View style={tw``}>
              <Text style={tw`font-bold text-base`}>Leslie Alexander</Text>
              <View style={tw`flex flex-row`}>
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
                <Text style={tw`text-gray-400`}>4</Text>
              </View>
              <View style={tw`flex flex-row mt-1`}>
                <Icon
                  name="location-pin"
                  type="entypo"
                  size={20}
                  color="#ffc727"
                />
                <Text style={tw`text-gray-400 ml-2`}>440 m</Text>
                <Text style={tw`mx-2 text-gray-400`}>2016</Text>
                <Text style={tw`text-gray-400`}>5 Seats</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={tw`font-bold text-lg`}>Kr269</Text>
            <Text style={tw`text-gray-400 text-sm`}>For 1 hr</Text>
          </View>
        </View>
        {/* Availavility section end */}

        {/* Home saloon section start */}
        <View style={tw`flex flex-row mt-5 border border-gray-200 rounded-lg p-3 h-auto`}>
          <View style={tw`mr-3 h-auto`}>
            <Icon name="home" type="antdesign" size={24} color="white" style={{padding:15, backgroundColor: "black", borderRadius:50}} />
          </View>
          <TouchableOpacity style={tw`w-75`} onPress={() => navigation.navigate('Profile')}>
            <Text style={tw`font-bold text-base mb-1`}>Home Salon</Text>
            <Text style={tw`text-sm`}>
              Book instantly, even at the last minute. Unlock and lock the car
              using the app. The keys areinside.
            </Text>
          </TouchableOpacity>
        </View>
        {/* Home saloon section end */}

        {/* Service included section start */}
        <Services />
        {/* Service included section end */}

        {/* Owner section start */}
        <View style={tw`mt-5 px-5`}>
          <Text style={tw`text-base`}>Owner</Text>
        </View>
        <TouchableOpacity
         onPress={() => navigation.navigate('ProfileReview')}
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
                <Text style={tw`font-bold text-lg mr-2`}>Theresa Webb</Text>
                <Icon
                  name="verified"
                  type="material"
                  size={20}
                  color="#30a8f8"
                />
              </View>
              <View style={tw`flex flex-row items-center`}>
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
            </View>
          </View>
          <Icon name="arrow-right" type="feather" size={20} color="black" />
        </TouchableOpacity>
        {/* Owner section end */}

        {/* Saloon features section start */}
        <SaloonFeatures />
        {/* Saloon features section end */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});
