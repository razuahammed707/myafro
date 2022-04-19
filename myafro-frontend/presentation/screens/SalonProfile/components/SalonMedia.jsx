import { View, FlatList, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import UploadImage from "./UploadImage";
import { useDispatch, useSelector } from "react-redux";
import { userHomeSelector } from "../../../../redux/slices/user/userHomeSlice";
import { salonSelector } from "../../../../redux/slices/salon/salonSlice";
import {
  deleteMedia,
  mediaSelector,
} from "../../../../redux/slices/salon/mediaSlice";

const SalonMedia = () => {
  const { hairDresserData } = useSelector(salonSelector);
  const dispatch = useDispatch();
  const { isSuccessMedia, isFetchingMedia } = useSelector(mediaSelector);

  // const images = [
  //   {
  //     id: 1,
  //     url: require("../../../../assets/img/1.png"),
  //   },
  //   {
  //     id: 2,
  //     url: require("../../../../assets/img/2.png"),
  //   },
  //   {
  //     id: 3,
  //     url: require("../../../../assets/img/2.png"),
  //   },
  // ];
  

  return (
    <ScrollView style={tw`h-70`}>
      <UploadImage />
      <View>
        {hairDresserData?.media?.map((item) => (
          <View style={tw`mb-5 px-5`} key={item._id}>
            <View style={{ position: "relative" }}>
              <Image
                style={{
                  width: "100%",
                  height: 190,
                  resizeMode: "cover",
                }}
                source={{ uri: item?.img_url }}
              />
              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    deleteMedia({
                      salonId: hairDresserData?._id,
                      mediaId: item?._id,
                    })
                  )
                }
                style={tw`flex flex-row absolute top-4 right-4 bg-white p-2 rounded-lg`}
              >
                <Icon name="trash-2" type="feather" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SalonMedia;
