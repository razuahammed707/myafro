import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createMedia,
  getMediaInfo,
  mediaSelector,
} from "../../../../redux/slices/salon/mediaSlice";
import { Button } from "react-native-elements";
import { authSelector } from "../../../../redux/slices/login/authSlice";
import { getSalon } from "../../../../redux/slices/salon/salonSlice";

const uploadImage = () => {
  const [image, setImage] = useState("");
  const { token } = useSelector(authSelector);
  const { isSuccessMedia, message } = useSelector(mediaSelector);
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
    dispatch(createMedia(formData));
  };

  useEffect(() => {
    isSuccessMedia && dispatch(getSalon(token)) && setImage("");
  }, [isSuccessMedia]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.uploadBtnContainer}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text style={styles.uploadBtn}>Upload Media</Text>
          )}
        </TouchableOpacity>
        {image ? (
          <Button
            onPress={uploadImageMedia}
            type="clear"
            buttonStyle={{
              backgroundColor: "green",
              color: "white",
              borderRadius: 8,
              marginBottom: 15,
            }}
            title="Upload"
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
    marginVertical: 15,
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
});

export default uploadImage;
