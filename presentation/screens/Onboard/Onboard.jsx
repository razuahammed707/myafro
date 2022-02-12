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
import BoardScreen from "./BoardScreen";
import tw from "twrnc";
const data = [
  {
    title: "Hair One",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, consequat sem molestie et, montes, pellentesque. Id sit vulputate mattis magna pellentesque convallis. Mattis donec elit facilisis mauris phasellus sit eget justo. Mattis curabitur pellentesque magna nulla.",
    image: require("../../../assets/img/board1.png"),
    bg: "#59b2ab",
  },
  {
    title: "Hair Two",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, consequat sem molestie et, montes, pellentesque. Id sit vulputate mattis magna pellentesque convallis. Mattis donec elit facilisis mauris phasellus sit eget justo. Mattis curabitur pellentesque magna nulla.",
    image: require("../../../assets/img/board2.png"),
    bg: "#febe29",
  },
  {
    title: "Hair Three",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, consequat sem molestie et, montes, pellentesque. Id sit vulputate mattis magna pellentesque convallis. Mattis donec elit facilisis mauris phasellus sit eget justo. Mattis curabitur pellentesque magna nulla.",
    image: require("../../../assets/img/board3.png"),
    bg: "#22bcb5",
  },
];

const Onboard = () => {
  const [show, setShow] = useState(false);
  const renderItem = ({ item }) => {
    return <BoardScreen item={item} />;
  };

  const renderSkipButton = () => {
    return <Text style={tw`text-black font-bold mt-4`}>Skip</Text>;
  };
  const renderNextButton = () => {
    return <Text style={tw`text-black font-bold mt-4`}>Next</Text>;
  };
  const renderDoneButton = () => {
    return <Text style={tw`text-black font-bold mt-4`}>Done</Text>;
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
            activeDotStyle={{ backgroundColor: "#222" }}
            showSkipButton={true}
            renderNextButton={renderNextButton}
            renderSkipButton={renderSkipButton}
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

export default Onboard;

const styles = StyleSheet.create({});
