import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import BottomBar from "../../components/BottomBar/BottomBar";
import { Button, Icon } from "react-native-elements";
import BottomDrawer from "../Home/components/BottomDrawer/BottomDrawer";
import { useSelector } from "react-redux";
import { mapSelector } from "../../../redux/slices/map/mapSlice";
import { useNavigation } from "@react-navigation/native";

const GoogleMap = () => {
  const { locationInfo } = useSelector(mapSelector);
  const navigation = useNavigation();

  console.log(locationInfo);

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
        showsTraffic={true}
        showsBuildings={true}
      >
        {locationInfo?.geometry?.location ? (
          <Marker
            key={locationInfo?.place_id}
            coordinate={{
              latitude: locationInfo?.geometry?.location?.lat,
              longitude: locationInfo.geometry?.location?.lng,
            }}
            title="My Location"
          />
        ) : (
          <Marker
            // key={locationInfo?.place_id}
            coordinate={{
              latitude: locationInfo?.coordinates?.latitude,
              longitude: locationInfo?.coordinates?.longitude,
            }}
            title="My Location"
          />
        )}
        {/* {mapMarkers()} */}
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
