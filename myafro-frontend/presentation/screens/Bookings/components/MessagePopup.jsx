import { Button, Overlay, Icon } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { bookingSelector, getSingleBookedSalon } from "../../../../redux/slices/booking/bookingSlice";
import Loader from "../../../components/Loader/Loader";

const MessagePopup = ({ onPress, getUpdatedBookings }) => {
  const { isSuccess, isFetching, singleBookedSalon } = useSelector(bookingSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <View>
        <Button
          title="Send"
          buttonStyle={{
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
          type="clear"
          icon={
            <Icon
              name="send"
              type="feather"
              size={20}
              color="#fff"
              style={tw`mr-2`}
            />
          }
          iconPosition="left"
          titleStyle={{ fontSize: 14 }}
          onPress={() => {
            onPress();
            toggleOverlay();
          }}
        />
      </View>
      {isSuccess && !isFetching && (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={styles.container}>
            <Text style={styles.textPrimary}>Message has been sent to user.</Text>
            <Icon name="check-circle" type="feather" size={40} color="green" />
          </View>
          <Button
            title="Close"
            type="clear"
            buttonStyle={{
              backgroundColor: "green",
            }}
            titleStyle={{ marginLeft: 10 }}
            onPress={() => {
              toggleOverlay();
              getUpdatedBookings()   
              navigation.navigate("Tabs");
            }}
          />
        </Overlay>
      )}
      <Loader loading={isFetching} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 8,
  },
  textPrimary: {
    fontSize: 20,
    color: "green",
    marginBottom: 20,
  },
});

export default MessagePopup;
