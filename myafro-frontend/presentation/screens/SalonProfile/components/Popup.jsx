import React, { useEffect, useLayoutEffect, useState } from "react";
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
import {
  createSalonService,
  fetchedSingleService,
  getServiceTitle,
  serviceSelector,
  updateSalonService,
} from "../../../../redux/slices/salon/serviceSlice";
import Loader from "../../../components/Loader/Loader";
import { authSelector } from "../../../../redux/slices/login/authSlice";

const Popup = ({ visible, toggleOverlay }) => {
  const [title, setTitle] = useState("");
  const { hairDresserData, isFetching } = useSelector(salonSelector);
  const { token } = useSelector(authSelector);
  const { serviceTitle, fetchedSingleTitle } = useSelector(serviceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServiceTitle({ title: title }));
  }, [title]);
  
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
            defaultValue={title || fetchedSingleTitle?.title}
            placeholder="Title"
          />
        </View>
        {fetchedSingleTitle?._id ? (
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
            title="Edit"
            onPress={() => {
              dispatch(
                updateSalonService({
                  token: token,
                  serviceData: serviceTitle,
                  salonId: hairDresserData?._id,
                  serviceId: fetchedSingleTitle?._id
                })
              );
              dispatch(fetchedSingleService({}))
              setTitle({title: ""})
              toggleOverlay();
            }}
          />
        ) : (
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
              dispatch(
                createSalonService({
                  token: token,
                  serviceData: serviceTitle,
                  salonId: hairDresserData?._id,
                })
              );
              toggleOverlay();
            }}
          />
        )}
      </Overlay>
      <Loader loading={isFetching} />
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
