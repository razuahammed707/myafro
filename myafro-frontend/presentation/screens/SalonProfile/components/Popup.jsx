import React, { useLayoutEffect, useState } from "react";
import { Button, Overlay, Icon, Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { salonSelector } from "../../../../redux/slices/salon/salonSlice";
import { createSalonService } from "../../../../redux/slices/salon/serviceSlice";
import Loader from "../../../components/Loader/Loader";

const Popup = ({ visible, toggleOverlay }) => {
  const [title, setTitle] = useState("");
  const [salonAssets, setSalonAssets] = useState(null);
  const { hairDresserData, isFetching } = useSelector(salonSelector);
  const dispatch = useDispatch();

  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        setSalonAssets({
          token: parsedToken?.access_token,
          serviceData: {
            title
          },
          salonId:"622b5c4f61a35827c55e8772",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(title)

  // console.log(hairDresserData?._id)

  useLayoutEffect(() => {
    getToken();
  }, []);

  return (
    <View>
      <View style={tw`flex flex-row items-center justify-between my-3`}>
        <Text style={tw`text-base font-bold`}>Services</Text>
        <TouchableOpacity
          style={tw`flex flex-row items-center`}
          onPress={toggleOverlay}
        >
          <Icon
            name="plus"
            type="font-awesome"
            color="black"
            size={20}
            iconStyle={{ marginRight: 10 }}
          />
          <Text style="">Add new</Text>
        </TouchableOpacity>
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Add Service</Text>
        <View>
          <Text style={tw`ml-5`}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setTitle(newText)}
            defaultValue={title}
            placeholder="Title"
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
          title="Add"
          onPress={() => {
            dispatch(createSalonService(salonAssets));
            toggleOverlay();
          }}
        />
      </Overlay>
      <Loader loading={isFetching}/>
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
    height: 40,
    margin: 12,
    width: 300,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 8,
  },
});

export default Popup;
