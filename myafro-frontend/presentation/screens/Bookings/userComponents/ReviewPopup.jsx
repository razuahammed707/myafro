import React, { useEffect, useState } from "react";
import { Button, Overlay, Icon } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
    createReview,
  getCreateReviewData,
  reviewSelector,
} from "../../../../redux/slices/reviews/reviewSlice";
import { AirbnbRating } from "react-native-ratings";
import { getUpdateBookingData, updateBooking } from "../../../../redux/slices/booking/bookingSlice";

const ReviewPopup = ({ authToken }) => {
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const { createReviewData } = useSelector(reviewSelector);
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const ratingCompleted = (rating) => {
    setRating(rating);
  };
  

  useEffect(() => {
    dispatch(
      getCreateReviewData({
        ...createReviewData,
        comment: comment,
        rating: rating,
      })
    );
  }, [comment, rating]);

console.log(createReviewData, authToken)
  return (
    <View>
      <View style={tw`my-3`}>
        <Button
          title="Complete Booking"
          type="clear"
          buttonStyle={{
            backgroundColor: "#444",
            width: "100%"
          }}
          titleStyle={{ marginLeft: 10 }}
          icon={<Icon name="trash" type="feather" size={20} color="#fff" />}
          iconPosition="left"
          onPress={() => {
            // dispatch(createBooking(assets));
            toggleOverlay();
          }}
        />
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
          <Text style={tw`text-2xl text-orange-600 text-center`}>
            Please give us a rating
          </Text>
          <AirbnbRating
            count={5}
            reviewSize={0}
            defaultRating={5}
            size={20}
            onFinishRating={ratingCompleted}
            starContainerStyle={{
              marginBottom: 20,
            }}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={3}
            onChangeText={(newText) => setComment(newText)}
            defaultValue={comment}
            placeholder="Write a comment"
          />
        </View>
        <Button
          icon={
            <Icon
              name="wrench"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Submit"
          onPress={() => {
            dispatch(createReview(authToken))
            dispatch(
              getUpdateBookingData({
                status: "complete"
              })
            );
            dispatch(updateBooking(authToken))
            toggleOverlay();
          }}
        />
      </Overlay>
      {/* <Loader loading={isFetching} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
  input: {
    margin: 12,
    width: 300,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 8,
  },
});

export default ReviewPopup;
