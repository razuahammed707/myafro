import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import tw from "twrnc";
import { Button, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { currentLocationInfo } = useSelector(mapSelector);
  const { isSuccess, updateSalonData, hairDresserData } =
    useSelector(salonSelector);
  const { data } = useSelector(authSelector);
  const { token } = useSelector(bookingSelector);

  const mapRef = React.createRef();
  useEffect(() => {
    mapRef.current.animateCamera({
      center: {
        latitude:
          currentLocationInfo?.geometry?.location?.lat ||
          currentLocationInfo?.coordinates?.latitude,
        longitude:
          currentLocationInfo?.geometry?.location?.lng ||
          currentLocationInfo?.coordinates?.longitude,
      },
    });
  }, [currentLocationInfo]);

  useEffect(() => {
    const latitude = String(
      currentLocationInfo?.geometry?.location?.lat ||
        currentLocationInfo?.coordinates?.latitude
    );
    const longitude = String(
      currentLocationInfo?.geometry?.location?.lng ||
        currentLocationInfo?.coordinates?.longitude
    );
    const coordinates = latitude + "," + longitude;
    dispatch(
      getValues({
        location: {
          coordinates: coordinates,
          name:
            currentLocationInfo?.formatted_address || currentLocationInfo?.name,
        },
      })
    );
  }, [currentLocationInfo]);

  console.log(currentLocationInfo);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <MapView
        style={styles.map}
        ref={mapRef}
        loadingEnabled={true}
        // mapType="mutedStandard"
        initialRegion={{
          latitude:
            currentLocationInfo?.geometry?.location?.lat ||
            currentLocationInfo?.coordinates?.latitude,
          longitude:
            currentLocationInfo?.geometry?.location?.lng ||
            currentLocationInfo?.coordinates?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="mutedStandard"
        focusable={true}
        showsBuildings={true}
      >
        <Marker
          // key={locationInfo?.place_id}
          coordinate={{
            latitude:
              currentLocationInfo?.geometry?.location?.lat ||
              currentLocationInfo?.coordinates?.latitude,
            longitude:
              currentLocationInfo?.geometry?.location?.lng ||
              currentLocationInfo?.coordinates?.longitude,
          }}
          // title={currentLocationInfo.name || currentLocationInfo.formatted_address}
          pinColor="tomato"
        >
          <Callout>
            <View style={tw`w-50 flex flex-row items-center justify-center`}>
              <Text style={tw`mt-2`}>
                {currentLocationInfo.formatted_address ||
                  currentLocationInfo.name}
              </Text>
            </View>
          </Callout>
        </Marker>
        <Circle
          center={{
            latitude:
              currentLocationInfo?.geometry?.location?.lat ||
              currentLocationInfo?.coordinates?.latitude,
            longitude:
              currentLocationInfo.geometry?.location?.lng ||
              currentLocationInfo?.coordinates?.longitude,
          }}
          radius={100}
          lineJoin="bevel"
          strokeColor="#222"
        />
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
              {currentLocationInfo?.formatted_address ? (
                <Text style={tw`text-sm font-semibold`}>
                  {currentLocationInfo?.formatted_address}
                </Text>
              ) : (
                <Text style={tw`text-sm font-semibold`}>
                  {currentLocationInfo?.name}
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
