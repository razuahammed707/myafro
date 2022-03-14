import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { homeData, services } from "../../../utils/dummyData";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getSalons,
  getSingleSalonInfo,
  userHomeSelector,
} from "../../../redux/slices/user/userHomeSlice";
import { authSelector } from "../../../redux/slices/login/authSlice";
import Loader from "../../components/Loader/Loader";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = () => {
  const navigation = useNavigation();
  const bottomSheet = useRef();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getSalons(assets))
    wait(2000).then(() => setRefreshing(false));

  }, []);
  // let [fontsLoaded, error] = useFonts({
  //   regular: Nunito_400Regular,
  //   semiBold: Nunito_600SemiBold,
  //   bold: Nunito_700Bold,
  //   extraBold: Nunito_800ExtraBold,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  const [assets, setAssets] = useState(null);
  const { salons, queries, isSuccess, isFetching } =
    useSelector(userHomeSelector);
  const dispatch = useDispatch();

  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        setAssets({
          token: parsedToken?.access_token,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    assets !== null && dispatch(getSalons(assets));
  }, [assets, queries]);

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
        {isSuccess ? (
          <>
            {salons.length > 0 ? (
              <FlatList
                data={salons}
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ItemSeparatorComponent={() => (
                  <View style={(tw`bg-gray-200`, { height: 0.5 })} />
                )}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={tw` mb-5`}
                    // onPress={() => bottomSheet.current.show()}
                    onPress={() => {
                      dispatch(getSingleSalonInfo(item._id));
                      navigation.navigate("ProfileDetails");
                    }}
                  >
                    <View style={{ position: "relative" }}>
                      <Image
                        style={{
                          width: "100%",
                          height: 190,
                          resizeMode: "cover",
                        }}
                        source={{ uri: item?.media[0]?.img_url }}
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
                          <Text style={tw`text-black ml-1 text-sm`}>240m</Text>
                        </View>
                      </View>
                      <View style={tw`flex flex-row absolute top-0 right-1`}>
                        <View
                          style={tw`flex flex-row items-center px-2 py-2 justify-center rounded-2xl bg-white m-2`}
                        >
                          <Text style={tw`text-black  text-sm`}>
                            {item?.salon_type}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={tw`flex items-center flex-row justify-between my-1`}
                    >
                      <Text style={tw`font-bold text-base`}>{item?.name}</Text>
                      <Text style={tw`text-sm text-gray-400`}>FROM</Text>
                    </View>
                    <View
                      style={tw`flex items-center flex-row justify-between`}
                    >
                      <View style={tw`flex items-center flex-row `}>
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
                        <Text style={tw`text-gray-400 text-sm`}>
                          {item.job}
                        </Text>
                      </View>
                      <View style={tw`flex items-center flex-row `}>
                        <Text style={tw`text-base text-black mr-2`}>
                          {item?.price}
                          <Text style={tw`text-gray-400 text-base`}>/h</Text>
                        </Text>
                        <Text style={tw`text-base text-black`}>
                          {item?.price}
                          <Text style={tw`text-gray-400 text-base`}>/day</Text>
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={tw`flex flex-row items-center justify-center`}>
                <Image
                  source={require("../../../assets/img/noData.png")}
                  height={100}
                  resizeMode="contain"
                />
              </View>
            )}
          </>
        ) : (
          <Loader loading={isFetching} />
        )}
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
