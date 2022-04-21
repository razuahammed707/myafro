import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Icon } from "react-native-elements";
import tw from "twrnc";
import {
  mediaSelector,
  uploadSharedImage,
} from "../../../redux/slices/salon/mediaSlice";
import { userProfileSelector } from "../../../redux/slices/user/userProfileSlice";
import { salonSelector } from "../../../redux/slices/salon/salonSlice";

const ProfileImageUploader = ({ setUploadImage }) => {
  const [image, setImage] = useState("");
  const { sharedMedia } = useSelector(mediaSelector);
  const { hairDresserData } = useSelector(salonSelector);
  const { userInfo } = useSelector(userProfileSelector);
  const dispatch = useDispatch();

  const openImageLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImageMedia = () => {
    const formData = new FormData();
    formData.append("img_url", {
      name: "img_url.jpg",
      uri: image,
      type: "image/jpg",
    });
    dispatch(uploadSharedImage(formData));
  };

  useEffect(() => {
    if (sharedMedia !== null) {
      setUploadImage(sharedMedia?.img_url);
    }
  }, [sharedMedia]);

  useEffect(() => {
    if (image) {
      uploadImageMedia();
    }
  }, [image]);

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => {
            openImageLibrary();
          }}
          //   style={styles.uploadBtnContainer}
        >
          {image ? (
            <Avatar size={64} rounded source={{ uri: image }} />
          ) : !image && (userInfo?.profile !== "" || hairDresserData?.cover !== "") ? (
            <Avatar size={64} rounded source={{ uri: userInfo?.profile || hairDresserData?.cover }} />
          ) : (
            <Avatar
              size={64}
              rounded
              title="Upload Image"
              titleStyle={tw`text-sm text-gray-400`}
              avatarStyle={tw`border border-gray-400`}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImageUploader;
