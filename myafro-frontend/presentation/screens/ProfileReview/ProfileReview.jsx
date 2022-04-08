import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { AirbnbRating, Icon } from "react-native-elements";
import Feedback from "./components/Feedback";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { reviewSelector } from "../../../redux/slices/reviews/reviewSlice";
import Loader from "../../components/Loader/Loader";

const ProfileReview = () => {
  const navigation = useNavigation();
  const { isFetching, profileReviewInfo } = useSelector(reviewSelector);

  return (
    <SafeAreaView style={tw`mb-20`}>
      <>
        {/* Top section start */}
        <View style={tw`flex flex-row items-center justify-between p-5`}>
          <View style={tw`flex flex-row`}>
            <Icon
              name="arrow-left"
              type="feather"
              size={28}
              color="black"
              onPress={() => navigation.goBack()}
            />
            <Text style={tw`font-bold text-lg ml-2`}>
              {profileReviewInfo?.user?.full_name}
            </Text>
          </View>
          <View style={tw`flex flex-row items-center`}>
            <AirbnbRating
              count={5}
              reviewSize={0}
              defaultRating={profileReviewInfo?.averageRatings}
              size={13}
              starContainerStyle={{
                marginTop: -20,
                marginLeft: 5,
                marginRight: 5,
              }}
            />
            <Text style={tw`text-gray-400`}>
              {profileReviewInfo?.totalReviews}
            </Text>
          </View>
        </View>
        {/* Top section end */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`flex flex-row justify-center items-center my-6`}>
            <View>
              {profileReviewInfo?.user?.profile === "" ? (
                <View style={tw`flex flex-row justify-center`}>
                  <Image
                    source={require("../../../assets/img/profilelg.png")}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <View style={tw`flex flex-row justify-center`}>
                  <Image
                    resizeMode="cover"
                    source={{ uri: profileReviewInfo?.user?.profile }}
                  />
<<<<<<< HEAD
=======
                )}
                <View style={tw`mt-3`}>
                  <View style={tw`flex flex-row`}>
                    <Text style={tw`font-bold text-lg mr-2`}>
                      {salonInfoForReview?.user?.full_name}
                    </Text>
                    <Icon
                      name="verified"
                      type="material"
                      size={20}
                      color="#30a8f8"
                    />
                  </View>
                  <View style={tw`flex flex-row items-center justify-center`}>
                    <AirbnbRating
                      count={5}
                      reviews={[]}
                      reviewSize={0}
                      defaultRating={5}
                      size={13}
                      starContainerStyle={{
                        marginTop: -20,
                        marginRight: 5,
                      }}
                    />
                    <Text style={tw`text-gray-400`}>{totalRatings}</Text>
                  </View>
                  <Text style={tw`text-gray-400 text-base text-center`}>
                    16 Saloons
                  </Text>
>>>>>>> 7aa3e1695a7c7ac2e3a6e20e54f36b2b06f5c913
                </View>
              )}
              <View style={tw`mt-3`}>
                <View style={tw`flex flex-row`}>
                  <Text style={tw`font-bold text-lg mr-2`}>
                    {profileReviewInfo?.user?.full_name}
                  </Text>
                  <Icon
                    name="verified"
                    type="material"
                    size={20}
                    color="#30a8f8"
                  />
                </View>
                <View style={tw`flex flex-row items-center justify-center`}>
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
                  <Text style={tw`text-gray-400`}>
                    {profileReviewInfo?.totalReviews}
                  </Text>
                </View>
                <Text style={tw`text-gray-400 text-base text-center`}>
                  {profileReviewInfo?.totalReviews} Reviews
                </Text>
              </View>
            </View>
          </View>

          {/* Profile bio section start here  */}
          <View style={tw`px-5`}>
            <Text style={tw`text-gray-400 text-base`}>
              {profileReviewInfo?.description}
            </Text>
          </View>
          {/* Profile bio section end here  */}

          {/* Account creation info start here */}
          <View>
            <View style={tw`px-5 my-7`}>
              <View
                style={tw`flex flex-row justify-between items-center mt-5 border-gray-200 border-b-2 pb-5`}
              >
                <Text style={tw`text-base font-normal`}>
                  Professional Owner
                </Text>
                <Icon
                  name="alert-circle"
                  type="feather"
                  size={20}
                  color="#000"
                />
              </View>
              <View style={tw`flex flex-row justify-between items-center mt-5`}>
                <Text style={tw`text-base`}>Member Since</Text>
                <Text style={tw`text-base text-gray-400`}>16/02/2021</Text>
              </View>
            </View>
          </View>
          {/* Account creation info end here */}

          {/* Profile details section start */}
          <Feedback />
          {/* Profile details section end */}
        </ScrollView>
        <Loader loading={isFetching} />
      </>
    </SafeAreaView>
  );
};

export default ProfileReview;

const styles = StyleSheet.create({});
