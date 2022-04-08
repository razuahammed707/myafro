import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AirbnbRating, Icon } from "react-native-elements";
import Services from "./components/Services";
import SaloonFeatures from "./components/SaloonFeatures";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { userHomeSelector } from "../../../redux/slices/user/userHomeSlice";
import MediaCarousel from "./components/MediaCarousel";
import { getProfileReviewInfo, getSalonInfoForReview } from "../../../redux/slices/reviews/reviewSlice";

const ProfileDetails = () => {
  const navigation = useNavigation();
  const [singleSalon, setSingleSalon] = useState(null);
  const dispatch = useDispatch()
  const { salons, singleSalonId } = useSelector(userHomeSelector);

  const getSingleSalon = (id) => {
    const salonID = salons?.find((salon) => salon._id === id);
    setSingleSalon(salonID);
  };

  useEffect(() => {
    getSingleSalon(singleSalonId);
  }, [singleSalonId]);

  useEffect(() => {
    dispatch(getSalonInfoForReview({user:singleSalon?.user, salonId: singleSalon?._id}))
    dispatch(getProfileReviewInfo(singleSalon))
  }, [singleSalon])

  
  return (
    <SafeAreaView style={tw`p-5`}>
      {singleSalon !== null ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`flex flex-row`}>
            <Icon
              name="arrow-left"
              type="feather"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View>
            <View style={tw`my-5`}>
              {/* <Image
                  style={{ width: "100%" }}
                  source={{ uri: singleSalon?.media[0]?.img_url }}
                /> */}
              <MediaCarousel data={singleSalon?.media} />
            </View>
            <View style={tw`flex flex-row justify-between`}>
              <View>
                <View style={tw``}>
                  <Text style={tw`font-bold text-base`}>
                    {singleSalon?.name}
                  </Text>
                  <View style={tw`flex flex-row`}>
                    <AirbnbRating
                      count={5}
                      reviewSize={0}
                      defaultRating={singleSalon?.averageRatings}
                      size={13}
                      starContainerStyle={{
                        marginTop: -20,
                        marginRight: 5,
                      }}
                    />
                    <Text style={tw`text-gray-400`}>{singleSalon?.totalReviews}</Text>
                  </View>
                  <View style={tw`flex flex-row mt-1`}>
                    <Icon
                      name="location-pin"
                      type="entypo"
                      size={20}
                      color="#ffc727"
                    />
                    <Text style={tw`text-gray-400 ml-2`}>440 m</Text>
                    <Text style={tw`mx-2 text-gray-400`}>2016</Text>
                    <Text style={tw`text-gray-400`}>5 Seats</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={tw`font-bold text-lg`}>
                  Kr{singleSalon?.price}
                </Text>
                <Text style={tw`text-gray-400 text-sm`}>For 1 hr</Text>
              </View>
            </View>
            <View
              style={tw`flex flex-row mt-5 border border-gray-200 rounded-lg p-3 h-auto`}
            >
              <View style={tw`mr-3 h-auto`}>
                <Icon
                  name="home"
                  type="antdesign"
                  size={24}
                  color="white"
                  style={{
                    padding: 15,
                    backgroundColor: "black",
                    borderRadius: 50,
                  }}
                />
              </View>
              <TouchableOpacity
                style={tw`w-75`}
                onPress={() => navigation.navigate("Profile")}
              >
                <Text style={tw`font-bold text-base mb-1`}>
                  {singleSalon?.salon_type}
                </Text>
                <Text style={tw`text-sm`}>
                  Book instantly, even at the last minute. Unlock and lock the
                  car using the app. The keys areinside.
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tw`my-5`}>
              <Text style={tw`font-bold text-base`}>Hair Types</Text>
              {singleSalon?.hair_type?.map((item) => (
                <View key={item}>
                  <View style={tw`flex flex-row mt-5`}>
                    <Icon name="check" type="feather" size={20} color="#222" />
                    <Text style={tw`text-lg ml-2`}>{item}</Text>
                  </View>
                </View>
              ))}
              {singleSalon?.hair_type.length < 1 && (
                <View style={tw`flex flex-row justify-center w-full`}>
                  <Image
                    source={require("../../../assets/img/notFound.png")}
                    height={100}
                    resizeMode="cover"
                  />
                </View>
              )}
            </View>
            <Services services={singleSalon?.services} />
            <View style={tw`mt-5 px-5`}>
              <Text style={tw`text-base`}>Owner</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProfileReview")}
              style={tw`py-4 flex flex-row border items-center justify-between border-gray-200 px-5 mt-3`}
            >
              <View style={tw`flex flex-row items-center`}>
                <Image
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  source={require("../../../assets/img/profile.png")}
                  resizeMode="contain"
                />
                <View style={tw`ml-4`}>
                  <View style={tw`flex flex-row`}>
                    <Text style={tw`font-bold text-lg mr-2`}>
                      {singleSalon?.user?.full_name}
                    </Text>
                    <Icon
                      name="verified"
                      type="material"
                      size={20}
                      color="#30a8f8"
                    />
                  </View>
                  <View style={tw`flex flex-row items-center`}>
                    <AirbnbRating
                      count={5}
                      reviews={[]}
                      reviewSize={0}
                      defaultRating={singleSalon?.averageRatings}
                      size={13}
                      starContainerStyle={{
                        marginTop: -20,
                        marginRight: 5,
                      }}
                    />
                    <Text style={tw`text-gray-400`}>{singleSalon?.totalReviews}</Text>
                  </View>
                </View>
              </View>
              <Icon name="arrow-right" type="feather" size={20} color="black" />
            </TouchableOpacity>
            <SaloonFeatures features={singleSalon?.features} />
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
          size={50}
          color="#ffa500"
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});
