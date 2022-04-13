import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_APIKEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getLocationInfo } from "../../../../redux/slices/map/mapSlice";

const MapAutocomplete = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={tw`p-5 mt-5`}>
      <GooglePlacesAutocomplete
        placeholder="Search Location"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log(data, details?.geometry);
          dispatch(getLocationInfo(details))
          navigation.navigate("Map")
        }}
        // currentLocation={true}
        query={{
          key: "AIzaSyBtm4Ahlay8ohFLRwYNSMQ1JAd3Q4rqmig",
          language: "en",
        }}
        enablePoweredByContainer={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
            padding: 10
          },
          textInput: {
            fontSize: 18,
          },
        }}
      />
    </SafeAreaView>
  );
};

export default MapAutocomplete;
