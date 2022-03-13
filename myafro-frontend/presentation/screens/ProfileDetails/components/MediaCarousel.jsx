import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import CarouselItem from "./CarouselItem";
//   const data = [
//     {
//       title: "Hair One",
//       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, consequat sem molestie et, montes, pellentesque. Id sit vulputate mattis magna pellentesque convallis. Mattis donec elit facilisis mauris phasellus sit eget justo. Mattis curabitur pellentesque magna nulla.",
//       image: require("../../../assets/img/board1.png"),
//       bg: "#59b2ab",
//     },
//     {
//       title: "Hair Two",
//       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, consequat sem molestie et, montes, pellentesque. Id sit vulputate mattis magna pellentesque convallis. Mattis donec elit facilisis mauris phasellus sit eget justo. Mattis curabitur pellentesque magna nulla.",
//       image: require("../../../assets/img/board2.png"),
//       bg: "#febe29",
//     },
//     {
//       title: "Hair Three",
//       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, consequat sem molestie et, montes, pellentesque. Id sit vulputate mattis magna pellentesque convallis. Mattis donec elit facilisis mauris phasellus sit eget justo. Mattis curabitur pellentesque magna nulla.",
//       image: require("../../../assets/img/board3.png"),
//       bg: "#22bcb5",
//     },
//   ];

const MediaCarousel = ({ data }) => {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    return <CarouselItem item={item} />;
  };

  const renderNextButton = () => {
    return <Text style={tw`text-white font-bold mt-4`}>Next</Text>;
  };
  const renderPrevButton = () => {
    return <Text style={tw`text-black font-bold mt-4`}>Prev</Text>;
  };

  useEffect(() => {
    setTimeout(() => setShow(true), 2000);
  }, []);

  const keyExtractor = (item) => item._id;
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={data}
          activeDotStyle={{ backgroundColor: "#fff" }}
          showDoneButton={false}
          renderNextButton={renderNextButton}
          renderPrevButton={renderPrevButton}
        />
      </SafeAreaView>
    </>
  );
};

export default MediaCarousel;

const styles = StyleSheet.create({});
