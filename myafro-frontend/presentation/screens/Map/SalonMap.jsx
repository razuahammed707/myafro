import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import tw from "twrnc";
import { Button, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentLocationInfo,
  getLocationInfo,
  mapSelector,
} from "../../../redux/slices/map/mapSlice";
import { useNavigation } from "@react-navigation/native";
import {
  getValues,
  salonSelector,
  updateSalon,
} from "../../../redux/slices/salon/salonSlice";
import { authSelector } from "../../../redux/slices/login/authSlice";
import { bookingSelector } from "../../../redux/slices/booking/bookingSlice";

const SalonMap = () => {
  const { locationInfo, currentLocationInfo } = useSelector(mapSelector);
  const { isSuccess, updateSalonData, hairDresserData } =
    useSelector(salonSelector);
  const { data } = useSelector(authSelector);
  const { token } = useSelector(bookingSelector);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let name = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocation(location);
      dispatch(
        getCurrentLocationInfo({
          coordinates: location?.coords,
          name: name[0]?.city,
        })
      );
      const latitude = String(location?.coords.latitude);
      const longitude = String(location?.coords.longitude);
      const coordinates = latitude + "," + longitude;
      dispatch(
        getValues({
          location: {
            coordinates: coordinates,
            name: name[0]?.city,
          },
        })
      );
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(text)
  }

  console.log(updateSalonData);
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        // mapType="mutedStandard"
        initialRegion={{
          latitude:
            hairDresserData?.location?.coordinates !== ""
              ? Number(hairDresserData?.location?.coordinates.split(",")[0])
              : locationInfo?.geometry?.location?.lat
              ? locationInfo?.geometry?.location?.lat
              : currentLocationInfo?.coordinates?.latitude,
          longitude:
            hairDresserData?.location?.coordinates !== ""
              ? Number(hairDresserData?.location?.coordinates.split(",")[1])
              : locationInfo.geometry?.location?.lng
              ? locationInfo.geometry?.location?.lng
              : currentLocationInfo?.coordinates?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        focusable={true}
        showsBuildings={true}
      >
        {hairDresserData?.location?.coordinates !== "" && !locationInfo?.name ? (
          <Marker
            key={locationInfo?.place_id}
            coordinate={{
              latitude: Number(hairDresserData?.location?.coordinates.split(",")[0]),
              longitude: Number(hairDresserData?.location?.coordinates.split(",")[1]),
            }}
            title={hairDresserData?.location?.name}
            pinColor="tomato"
          />
        ) : currentLocationInfo?.coordinates && !locationInfo.name ? (
          <Marker
            // key={locationInfo?.place_id}
            coordinate={{
              latitude: currentLocationInfo?.coordinates?.latitude,
              longitude: currentLocationInfo?.coordinates?.longitude,
            }}
            title={currentLocationInfo.name}
            pinColor="tomato"
          />
        ) : locationInfo?.geometry?.location &&
          (
            <Marker
              // key={locationInfo?.place_id}
              coordinate={{
                latitude: locationInfo?.geometry?.location?.lat,
                longitude: locationInfo?.geometry?.location?.lng,
              }}
              title={locationInfo?.name}
              pinColor="tomato"
            />
          )
        }
        {/* {mapMarkers()} */}
        {/* {locationInfo?.geometry?.location && (
          <Circle
            center={{
              latitude: locationInfo?.geometry?.location?.lat,
              longitude: locationInfo.geometry?.location?.lng,
            }}
            radius={100}
            lineJoin="bevel"
            strokeColor="#222"
          />
        )} */}
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
              {!locationInfo?.name && !hairDresserData?.location?.name ? (
                <Text style={tw`text-sm font-semibold`}>Current Location</Text>
              ) : (
                <Text style={tw`text-sm font-semibold`}>
                  {locationInfo?.name
                    ? locationInfo?.name
                    : hairDresserData?.location?.name}
                </Text>
              )}
              <Text style={tw`text-sm text-gray-600`}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <BottomBar /> */}

      <View style={{ position: "absolute", bottom: 100, width: "100%" }}>
        <View style={tw`flex flex-row justify-center w-full`}>
          <Button
            title="Save Salon Location"
            buttonStyle={{
              paddingHorizontal: 20,
              paddingVertical: 16,
              backgroundColor: "#fff",
            }}
            onPress={() => {
              dispatch(
                updateSalon({
                  token: token || data?.access_token,
                  salonId: hairDresserData?._id || data?.salon?._id,
                })
              );
              if (isSuccess) {
                alert("Salon Location Updated Successfully");
                navigation.navigate("Tabs");
              }
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

export default SalonMap;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
