import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  createMedia,
  mediaSelector,
  uploadSharedImage,
} from "../../../../redux/slices/salon/mediaSlice";
import { Button, Icon } from "react-native-elements";
import { authSelector } from "../../../../redux/slices/login/authSlice";
import tw from "twrnc";

const CurrentHairImage = ({ uploadImages, setUploadImages }) => {
  const [image, setImage] = useState("");
  const { sharedMedia } = useSelector(mediaSelector);
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
    if (image) {
      uploadImageMedia();
    }
  }, [image]);

  useEffect(() => {
    if (sharedMedia !== null) {
      const findImage = uploadImages.find(
        (image) => image.img_url === sharedMedia.img_url
      );
      if (!findImage) {
        setUploadImages([...uploadImages, { img_url: sharedMedia?.img_url }]);
      }
      setTimeout(() => {
        setImage();
      }, 2000);
    }
  }, [sharedMedia]);

  // console.log(sharedMedia)
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={openImageLibrary}
          //   style={styles.uploadBtnContainer}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 192, marginBottom: 15 }}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.uploadBtnContainer}>
              <Text style={tw`text-2xl text-gray-400 capitalize`}>
                Upload your current hair images
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {/* {image ? (
          <View style={tw`my-5 flex flex-col justify-end items-end`}>
            <Button
              title="Click to Upload"
              onPress={() => uploadImageMedia()}
              buttonStyle={{
                paddingHorizontal: 20,
                paddingVertical: 12,
                backgroundColor: "transparent",
                //   width:"50%",
                borderColor: "#000",
              }}
              type="solid"
              icon={
                <Icon
                  name="upload-cloud"
                  type="feather"
                  size={20}
                  color="#000"
                  style={tw`mr-2`}
                />
              }
              iconPosition="left"
              titleStyle={{ fontSize: 14, color: "#000" }}
            />
          </View>
        ) : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  uploadBtnContainer: {
    height: 192,
    width: "100%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 15,
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

export default CurrentHairImage;
