import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AirbnbRating } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import moment from 'moment'
import { getReviews, reviewSelector } from "../../../../redux/slices/reviews/reviewSlice";
import { useDispatch, useSelector } from "react-redux";

const Feedback = () => {
  const dispatch = useDispatch();
  const { salonInfoForReview, reviews } =
    useSelector(reviewSelector);
  const [assets, setAssets] = useState(null);

  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        setAssets({
          salonId: salonInfoForReview?.salonId,
          token: parsedToken?.access_token,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    assets?.token !== undefined &&
      assets?.token !== null &&
      assets?.token !== "" &&
      dispatch(getReviews(assets));
  }, [assets, salonInfoForReview]);
  return (
    <View style={tw`flex justify-between mb-5`}>
      {reviews.length > 0 && reviews?.map((review) => (
        <View
        key={review?._id}
          style={tw`py-4 flex flex-row justify-between border-gray-200 border-t-2 px-5`}
        >
          <View style={tw`flex flex-row`}>
           {review?.user?.profile === "" ?  <Image
              style={{
                width: 36,
                height: 36,
              }}
              source={require("../../../../assets/img/a2.png")}
              resizeMode="contain"
            />: <Image
            style={{
              width: 36,
              height: 36,
            }}
            resizeMode="contain"
            source={{ uri: review?.user?.profile }}
          />} 
            <View style={tw`ml-4 w-60`}>
              <View>
                <Text style={tw`font-bold text-lg mr-2`}>{review?.user?.full_name}</Text>
                <Text style={tw`text-gray-400 text-sm`}>
                 {review?.comment}
                </Text>
              </View>
              <View style={tw`flex flex-row`}>
                <AirbnbRating
                  count={5}
                  reviewSize={0}
                  reviews={[]}
                  defaultRating={review?.rating}
                  size={13}
                  starContainerStyle={{
                    marginTop: -20,
                    marginRight: 5,
                  }}
                  isDisabled={true}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={tw`text-gray-400 text-sm`}>{moment(review?.createdAt).startOf('day').fromNow()}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({});
