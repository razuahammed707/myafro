import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import tw from "twrnc";
import BottomBar from "../../components/BottomBar/BottomBar";
import { Button, Icon } from "react-native-elements";
import BottomDrawer from "../Home/components/BottomDrawer/BottomDrawer";
import { useDispatch, useSelector } from "react-redux";
import { mapSelector } from "../../../redux/slices/map/mapSlice";
import { useNavigation } from "@react-navigation/native";
import {
  getSingleSalonInfo,
  userHomeSelector,
} from "../../../redux/slices/user/userHomeSlice";

const GoogleMap = () => {
  const { locationInfo } = useSelector(mapSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { salons } = useSelector(userHomeSelector);

  const origin = {
    latitude: locationInfo?.coordinates?.latitude,
    longitude: locationInfo?.coordinates?.longitude,
  };
  const destination = { latitude: 23.8179055, longitude: 90.3602682 };
  const GOOGLE_MAPS_APIKEY = "AIzaSyBtm4Ahlay8ohFLRwYNSMQ1JAd3Q4rqmig";

  let destinationRequest = salons
    .map((salon) => {
      // const lat = Number(salon?.location?.coordinates?.split(",")[0]);
      // const lng = Number(salon?.location?.coordinates?.split(",")[1]);
      // return `${lat},${lng}`;
      console.log(salon?.location?.name)
      return salon?.location.name
    })
    // .join("|");

  useEffect(() => {
    const getDistance = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=dhaka&destinations=${destinationRequest}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
    };
    getDistance();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  console.log(destinationRequest);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        // mapType="mutedStandard"
        initialRegion={{
          latitude: locationInfo?.geometry?.location?.lat
            ? locationInfo?.geometry?.location?.lat
            : locationInfo?.coordinates?.latitude,
          longitude: locationInfo.geometry?.location?.lng
            ? locationInfo.geometry?.location?.lng
            : locationInfo?.coordinates?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        focusable={true}
        showsBuildings={true}
      >
        {salons?.map((salon) => (
          <View key={salon?._id}>
            <MapViewDirections
              origin={{
                latitude: locationInfo?.coordinates?.latitude,
                longitude: locationInfo?.coordinates?.longitude,
              }}
              destination={{
                latitude: Number(salon?.location?.coordinates?.split(",")[0]),
                longitude: Number(salon?.location?.coordinates?.split(",")[1]),
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="black"
            />
            <Marker
              key={salon?._id}
              onPress={() => {
                dispatch(getSingleSalonInfo(salon._id));
                navigation.navigate("ProfileDetails");
              }}
              coordinate={{
                latitude: Number(salon?.location?.coordinates?.split(",")[0]),
                longitude: Number(salon?.location?.coordinates?.split(",")[1]),
              }}
              title={salon?.location?.name}
              pinColor="tomato"
            />
          </View>
        ))}
      </MapView>
      <View style={tw`absolute top-5 w-full`}>
        <View
          style={tw`flex flex-row items-center justify-between p-3 mx-5 rounded-lg  mt-8 border border-gray-100 bg-white`}
        >
          <View style={tw`flex flex-row items-center `}>
            <Icon
              name="location-on"
              type="materialicons"
              size={20}
              color="black"
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("MapAutocomplete")}
              style={tw`ml-3`}
            >
              {!locationInfo?.name ? (
                <Text style={tw`text-sm font-semibold`}>Current Location</Text>
              ) : (
                <Text style={tw`text-sm font-semibold`}>
                  {locationInfo?.name}
                </Text>
              )}
              <Text style={tw`text-sm text-gray-600`}>NO</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row items-center `}>
            <Icon name="shopping-bag" type="feather" size={20} color="black" />
            <Text style={tw`text-sm ml-2`}>When</Text>
          </View>
        </View>
        <View style={tw`flex items-center flex-row justify-center my-3`}>
          <BottomDrawer hair="hair" />
          <BottomDrawer />
        </View>
      </View>
      <BottomBar />
      <View style={{ position: "absolute", bottom: 100, width: "100%" }}>
        <View style={tw`flex flex-row justify-center w-full`}>
          <Button
            title="See nearby salons"
            buttonStyle={{
              paddingHorizontal: 20,
              paddingVertical: 16,
              backgroundColor: "#fff",
            }}
            onPress={() => {
              navigation.navigate("HomeTabs");
            }}
            type="clear"
            icon={
              <Icon
                name="send"
                type="feather"
                size={20}
                color="#000"
                style={tw`mr-2`}
              />
            }
            iconPosition="left"
            titleStyle={{ fontSize: 14, color: "#000" }}
          />
        </View>
      </View>
    </View>
  );
};

export default GoogleMap;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
