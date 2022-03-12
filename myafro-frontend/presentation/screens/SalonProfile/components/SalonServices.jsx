import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Popup from "./Popup";
import { Icon } from "react-native-elements";
import { salonSelector } from "../../../../redux/slices/salon/salonSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteSalonService } from "../../../../redux/slices/salon/serviceSlice";
import { authSelector } from "../../../../redux/slices/login/authSlice";
const SalonServices = () => {
  const [visible, setVisible] = useState(false);
  const { hairDresserData } = useSelector(salonSelector);
  const {token} = useSelector(authSelector)
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    setVisible(!visible);
  };


  return (
    <View style={tw`px-5`}>
      <Popup visible={visible} toggleOverlay={toggleOverlay}/>
      <View>
        {hairDresserData?.services?.map((item) => (
          <View
            style={tw`flex flex-row items-center justify-between mt-4`}
            key={item?._id}
          >
            <Text style={tw`text-base`}>{item?.title}</Text>
            <View style={tw`flex flex-row items-center`}>
              <Icon
                name="edit-2"
                type="feather"
                color="black"
                size={16}
                iconStyle={{ marginRight: 10 }}
                onPress={() => toggleOverlay()}
              />
              <Icon
                name="trash-2"
                type="feather"
                color="black"
                size={16}
                iconStyle={{ marginRight: 10 }}
                onPress={() => {
                  dispatch(deleteSalonService({
                    token:token,
                    salonId:hairDresserData?._id,
                    serviceId: item._id,
                  }))
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SalonServices;

const styles = StyleSheet.create({});
