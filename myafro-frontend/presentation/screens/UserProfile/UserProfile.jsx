import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { Avatar, Icon } from "react-native-elements";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const UserProfile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View
        style={tw`flex flex-row items-center justify-between px-5 py-4 border-b border-gray-200`}
      >
        <TouchableOpacity
          style={tw`flex flex-row items-center`}
          onPress={() => navigation.goBack()}
        >
          <Icon name="cross" type="entypo" size={20} color="black" />
          <Text style={tw`text-base font-bold`}>Cancel</Text>
        </TouchableOpacity>
        <Text style={tw`text-base font-bold`}>Profile</Text>
        <Text
          style={tw`text-base font-bold`}
          // onPress={() => dispatch(updateSalon(salonAssets))}
        >
          Save
        </Text>
      </View>
      <View style={tw`mb-5 h-full`}>
        <View
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            position: "relative",
          }}
        >
          <Avatar
            size={64}
            rounded
            source={require("../../../assets/img/1.png")}
          />
          <View style={tw`absolute bottom-6 z-10 left-15`}>
            <Icon name="edit-2" type="feather" size={16} color="white" />
          </View>
          <View style={tw`ml-4`}>
            <Text style={tw`text-base font-bold`}>Name</Text>
            <Text style={tw` text-sm text-gray-500`}>Role</Text>
          </View>
        </View>
        <View>
          <View>
            <Text style={tw`ml-5`}>Full name</Text>
            <TextInput
              style={styles.input}
              // onChangeText={(newText) => setName(newText)}
              // defaultValue={name || hairDresserData?.name}
              placeholder="Name"
              keyboardType="default"
            />
          </View>
          <View>
            <Text style={tw`ml-5`}>Email</Text>
            <TextInput
              style={styles.input}
              // onChangeText={(newText) => setName(newText)}
              // defaultValue={name || hairDresserData?.name}
              placeholder="Email"
              keyboardType="default"
            />
          </View>
          <View>
            <Text style={tw`ml-5`}>Mobile</Text>
            <TextInput
              style={styles.input}
              // onChangeText={(newText) => setName(newText)}
              // defaultValue={name || hairDresserData?.name}
              placeholder="Mobile"
              keyboardType="default"
            />
          </View>
          <View>
            <Text style={tw`ml-5`}>Address</Text>
            <TextInput
              style={styles.input}
              // onChangeText={(newText) => setLocation(newText)}
              // defaultValue={hairDresserData?.location || location}
              placeholder="Address"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 8,
  },
});
export default UserProfile;
