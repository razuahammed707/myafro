import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { homeData } from "../../../utils/dummyData";
import { AirbnbRating } from "react-native-ratings";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import BottomDrawer from "./components/BottomDrawer/BottomDrawer";
import BottomSheet from "react-native-gesture-bottom-sheet";
import DateTabs from "./components/DateTabs/DateTabs";

const Home = () => {
  const navigation = useNavigation();
  const bottomSheet = useRef();
  let [fontsLoaded, error] = useFonts({
    regular: Nunito_400Regular,
    semiBold: Nunito_600SemiBold,
    bold: Nunito_700Bold,
    extraBold: Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`h-1/1 p-5`}>
        <View
          style={tw`flex flex-row items-center justify-between p-3 rounded-lg  mt-5 border border-gray-300`}
        >
          <View style={tw`flex flex-row items-center`}>
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
          <TouchableOpacity
            style={tw`flex flex-row items-center `}
            onPress={() => bottomSheet.current.show()}
          >
            <Icon name="shopping-bag" type="feather" size={20} color="black" />
            <Text style={tw`text-sm ml-2`}>When</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex items-center flex-row justify-center my-3`}>
          <BottomDrawer hair="hair" />
          <BottomDrawer />
        </View>
        <Text style={{ color: "#bdbdbd", fontSize: 16, marginBottom: 10 }}>
          100 results of 455
        </Text>
        {/* <CirclesLoader /> */}
        <FlatList
          data={homeData}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={(tw`bg-gray-200`, { height: 0.5 })} />
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw` mb-5`}
              // onPress={() => bottomSheet.current.show()}
              onPress={() => navigation.navigate("ProfileDetails")}
            >
              <View style={{ position: "relative" }}>
                <Image
                  style={{
                    width: "100%",
                    height: 190,
                    resizeMode: "cover",
                  }}
                  source={item.img}
                />
                <View style={tw`flex flex-row absolute top-0 left-1`}>
                  <View
                    style={tw`flex flex-row items-center px-2 py-1 rounded-2xl bg-white m-2`}
                  >
                    <Icon
                      name="location-on"
                      type="materialicons"
                      size={24}
                      color="black"
                    />
                    <Text style={tw`text-black ml-1 text-sm`}>
                      {item.distance}
                    </Text>
                  </View>
                </View>
                <View style={tw`flex flex-row absolute top-0 right-1`}>
                  <View
                    style={tw`flex flex-row items-center px-2 py-2 justify-center rounded-2xl bg-white m-2`}
                  >
                    <Text style={tw`text-black  text-sm`}>
                      {item.hair_type}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={tw`flex items-center flex-row justify-between my-1`}>
                <Text style={tw`font-bold text-base`}>{item.name}</Text>
                <Text style={tw`text-sm text-gray-400`}>FROM</Text>
              </View>
              <View style={tw`flex items-center flex-row justify-between`}>
                <View style={tw`flex items-center flex-row `}>
                  <AirbnbRating
                    count={5}
                    reviewSize={0}
                    defaultRating={5}
                    size={13}
                    starContainerStyle={{ marginTop: -20, marginRight: 5 }}
                  />
                  <Text style={tw`text-gray-400 text-sm`}>{item.job}</Text>
                </View>
                <View style={tw`flex items-center flex-row `}>
                  <Text style={tw`text-base text-black mr-2`}>
                    {item.perHour}
                    <Text style={tw`text-gray-400 text-base`}>/h</Text>
                  </Text>
                  <Text style={tw`text-base text-black`}>
                    {item.perDay}
                    <Text style={tw`text-gray-400 text-base`}>/day</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={tw`absolute bottom-6 right-6`}
          onPress={() => navigation.navigate("Map")}
        >
          <View style={tw`bg-white py-2 px-4 rounded-lg`}>
            <Icon
              name="location-on"
              type="materialicons"
              size={20}
              color="black"
            />
            <Text style={tw`mt-1`}>Map</Text>
          </View>
        </TouchableOpacity>
        <BottomSheet hasDraggableIcon ref={bottomSheet} height={400}>
          <DateTabs />
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_400Regular",
  },
});
