import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_APIKEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocationInfo,
  mapSelector,
} from "../../../../redux/slices/map/mapSlice";
import { Icon } from "react-native-elements";
import {
  getValues,
  salonSelector,
} from "../../../../redux/slices/salon/salonSlice";

const MapAutocomplete = () => {
  const navigation = useNavigation();
  const [isSearch, setIsSearch] = useState({});
  const { updateSalonData, hairDresserData } = useSelector(salonSelector);
  const dispatch = useDispatch();

  const lat = String(isSearch?.geometry?.location?.lat);
  const lng = String(isSearch?.geometry?.location?.lng);
  const coordinates = lat + "," + lng;

  useEffect(() => {
    dispatch(
      getValues({
        ...updateSalonData,
        location: {
          coordinates: coordinates || hairDresserData?.location?.coordinates,
          name: isSearch?.formatted_address || hairDresserData?.location?.name,
        },
      })
    );
  }, [isSearch]);
  console.log(isSearch)

  return (
    <SafeAreaView style={tw`p-5 flex flex-row w-full`}>
      <GooglePlacesAutocomplete
        disableScroll={true}
        placeholder={hairDresserData?.location?.name}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log(data, details?.geometry);
          dispatch(getLocationInfo(details));
          setIsSearch(details);
          // navigation.navigate("SalonMap")
          // : navigation.navigate("Map");
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
            flex: 1,
            width: "80%",
            marginRight: 5,
            padding: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
      />
      <View
        style={tw`flex flex-row items-center px-5 rounded-lg bg-white h-11`}
      >
        <Icon name="my-location" type="material" size={20} color="#222" />
      </View>
    </SafeAreaView>
  );
};

export default MapAutocomplete;
