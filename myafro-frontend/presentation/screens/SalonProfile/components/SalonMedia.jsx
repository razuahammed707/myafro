import { View, FlatList, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import UploadImage from "./UploadImage";

const SalonMedia = () => {
  const images = [
    {
      id: 1,
      url: require("../../../../assets/img/1.png"),
    },
    {
      id: 2,
      url: require("../../../../assets/img/2.png"),
    },
    {
      id: 3,
      url: require("../../../../assets/img/2.png"),
    },
  ];

  return (
    <ScrollView>
      <UploadImage />
      <View>
        {images.map((item) => (
          <TouchableOpacity style={tw`mb-5`} key={item.id}>
            <View style={{ position: "relative" }}>
              <Image
                style={{
                  width: "100%",
                  height: 190,
                  resizeMode: "cover",
                }}
                source={item.url}
              />
              <View style={tw`flex flex-row absolute top-4 right-4`}>
                <Icon name="trash-2" type="feather" size={20} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default SalonMedia;
