import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import BottomBar from "../../components/BottomBar/BottomBar";
import { Icon } from "react-native-elements";
import BottomDrawer from "../Home/components/BottomDrawer/BottomDrawer";
import { useSelector } from "react-redux";
import { mapSelector } from "../../../redux/slices/map/mapSlice";

const GoogleMap = () => {
  const { locationInfo } = useSelector(mapSelector);
  console.log(locationInfo?.coordinates);
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        // mapType="mutedStandard"
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        focusable={true}
        // showsTraffic={true}
        showsBuildings={true}
      >
        {locationInfo?.coordinates && (
          <Marker
            coordinate={{
              latitude: locationInfo?.coordinates?.latitude,
              longitude: locationInfo.coordinates?.longitude,
            }}
            title="My Location"
            identifier="origin"
          />
        )}
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
            <View style={tw`ml-3`}>
              <Text style={tw`text-sm font-semibold`}>Gamle Oslo</Text>
              <Text style={tw`text-sm text-gray-600`}>NO</Text>
            </View>
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
