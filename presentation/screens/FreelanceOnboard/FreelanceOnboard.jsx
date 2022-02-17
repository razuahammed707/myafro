import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import FreelanceBoardScreen from "./components/FreelanceBoardScreen";
import { useNavigation } from "@react-navigation/native";
const data = [
  {
    title: "Earn up to $500 per month ",
    image: require("../../../assets/img/coin.png"),
    rule1: "Set your hair style schedule, price and hiring condition",
    rule2:
      "Comprehsive insurance from Allianz and 24/7 roadside assistance by AA.",
    rule3: "Earn more ans save time with our keyless technology",
  },
  {
    title: "See how muh you could earn",
    image: "",
    item1: "Make",
    item1_val: "Volkswagen",
    item2: "Model",
    item2_val: "Golf",
    item3: "Year of registration",
    item3_val: "2017",
    item4: "Mileage",
    item4_val: "30-60000 mi",
    item5: "Near",
    item5_val: "London",
    icon_name: "user",
    icon_type: "entypo",
  },
];

const FreelanceOnboard = () => {
  const [show, setShow] = useState(false);
  const navigation = useNavigation()
  const renderItem = ({ item }) => {
    return <FreelanceBoardScreen item={item} />;
  };

  const renderNextButton = () => {
    return <Text style={tw`text-black font-bold mt-4`}>Next</Text>;
  };
  const renderDoneButton = () => {
    return <Text style={tw`text-black font-bold mt-4`} onPress={() => navigation.navigate('Tabs')}>Get started</Text>;
  };

  useEffect(() => {
    setTimeout(() => setShow(true), 2000);
  }, []);

  const keyExtractor = (item) => item.title;
  return (
    <>
      {show ? (
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="transparent" />
          <AppIntroSlider
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            data={data}
            contentContainerStyle={{ backgroundColor: "white" }}
            activeDotStyle={{ backgroundColor: "#222" }}
            showSkipButton={true}
            renderNextButton={renderNextButton}
            renderDoneButton={renderDoneButton}
          />
        </SafeAreaView>
      ) : (
        <View style={tw`flex items-center justify-center h-1/1`}>
          <Image
            source={require("../../../assets/img/loader.png")}
            resizeMode="contain"
          />
        </View>
      )}
    </>
  );
};

export default FreelanceOnboard;

const styles = StyleSheet.create({});
