import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_APIKEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentLocationInfo,
  getLocationInfo,
  mapSelector,
} from "../../../../redux/slices/map/mapSlice";
import { Icon } from "react-native-elements";
import {
  getValues,
  salonSelector,
} from "../../../../redux/slices/salon/salonSlice";
import { authSelector } from "../../../../redux/slices/login/authSlice";

const MapAutocomplete = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const [isSearch, setIsSearch] = useState({});
  const { locationInfo, currentLocationInfo } = useSelector(mapSelector);
  const { data } = useSelector(authSelector);
  const { updateSalonData, hairDresserData } = useSelector(salonSelector);
  const dispatch = useDispatch();

  const lat = String(locationInfo?.geometry?.location?.lat);
  const lng = String(locationInfo?.geometry?.location?.lng);
  const coordinates = lat + "," + lng;

  useEffect(() => {
    dispatch(
      getValues({
        ...updateSalonData,
        location: {
          coordinates: coordinates || hairDresserData?.location?.coordinates,
          name: locationInfo?.name || hairDresserData?.location?.name,
        },
      })
    );
  }, [locationInfo]);

  return (
    <SafeAreaView style={tw`p-5 flex flex-row w-full`}>
      {hairDresserData?.user?.role === "hair_dresser" && router.name !== "SalonProfile" ? (
        <>
          <GooglePlacesAutocomplete
            disableScroll={true}
            placeholder={hairDresserData?.location?.name}
            onPress={(data, details = null) => {
              if (locationInfo?.name) {
                dispatch(getLocationInfo({}));
                dispatch(getLocationInfo(details));
                navigation.navigate("SalonMap");
              } else {
                dispatch(getLocationInfo(details));
                navigation.navigate("SalonMap");
              }
            }}
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
                marginTop:20,
                padding: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("SalonMap")}
            style={tw`flex flex-row items-center px-5 mt-5 rounded-lg bg-white h-11`}
          >
            <Icon name="my-location" type="material" size={20} color="#222" />
          </TouchableOpacity>
        </>
      ) : router.name === "SalonProfile" ? (
        <>
          <GooglePlacesAutocomplete
            disableScroll={true}
            placeholder={hairDresserData?.location?.name}
            onPress={(data, details = null) => {
              setIsSearch(details);
              dispatch(getLocationInfo(details));
            }}
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
          <TouchableOpacity
            onPress={() => navigation.navigate("SalonMap")}
            style={tw`flex flex-row items-center px-5 rounded-lg bg-white h-11`}
          >
            <Icon name="my-location" type="material" size={20} color="#222" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <GooglePlacesAutocomplete
            disableScroll={true}
            placeholder={currentLocationInfo?.name}
            onPress={(data, details = null) => {
              dispatch(getLocationInfo(details));
              dispatch(getCurrentLocationInfo(details))
              setIsSearch(details);
              navigation.navigate("Map");
            }}
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
          <TouchableOpacity
            onPress={() => navigation.navigate("Map")}
            style={tw`flex flex-row items-center px-5 rounded-lg bg-white h-11`}
          >
            <Icon name="my-location" type="material" size={20} color="#222" />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default MapAutocomplete;
