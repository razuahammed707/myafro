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
import UserCarouselItem from "./UserCarouselItem";
  // const data = [
  //   {
  //     id:1,
  //     image: require("../../../../assets/img/2.png"),
  //   },
  //   {
  //     id:2,
  //     image: require("../../../../assets/img/1.png"),
  //   },
  //   {
  //     id:3,
  //     image: require("../../../../assets/img/current.png"),
  //   },
  // ];

const UserMediaCarousel = ({singleBooking, singleBookedSalon}) => {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    return <UserCarouselItem item={item} />;
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
      <SafeAreaView style={{ flex:1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={singleBookedSalon?.current_hair || singleBooking?.current_hair}
          activeDotStyle={{ backgroundColor: "#fff" }}
          showDoneButton={false}
          alwaysBounceHorizontal={true}
          renderNextButton={renderNextButton}
          renderPrevButton={renderPrevButton}
        />
      </SafeAreaView>
  );
};

export default UserMediaCarousel;

const styles = StyleSheet.create({});
