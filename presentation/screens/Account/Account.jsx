import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { accountData1, accountData2 } from "../../../utils/dummyData";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "../Home/components/DateTimePicker/DateTimePicker";
// import DateTimePicker from "react-native-modal-datetime-picker";

const Account = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`p-5 h-full`}>
      {/* <DateTimePicker /> */}
      <View>
        <View style={tw`flex flex-row items-center`}>
          <Icon name="arrow-left" type="feather" size={28} color="black" onPress={() => navigation.goBack()} />
          <Text style={tw`font-bold text-xl ml-2`}>Account</Text>
        </View>
        {/* Data one start  */}
        <FlatList
          data={accountData1}
          style={{ marginTop: 25 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={tw` mb-3 flex flex-row items-center justify-between border-gray-200 border-b-2 pb-3`}
            >
              <View style={tw`flex flex-row items-center`}>
                <Icon
                  name={item.icon_name}
                  type={item.icon_type}
                  size={20}
                  color="black"
                />
                <Text
                  style={tw`ml-3 text-sm`}
                  onPress={() => navigation.navigate(item.link)}
                >
                  {item.name}
                </Text>
              </View>
              <Icon
                name="arrow-forward-ios"
                type="material"
                size={20}
                color="gray"
              />
            </View>
          )}
        />
        {/* Data one end  */}

        {/* Background image section start */}
        <View style={{ position: "relative", marginBottom: 20 }}>
          <Image
            style={{ width: "100%" }}
            source={require("../../../assets/img/accountbg.png")}
            resizeMode="cover"
          />
          <View style={tw`absolute top-5 w-full flex justify-center flex-row`}>
            <View>
              <Text style={tw`font-bold text-xl text-center`}>
                Own a Saloon
              </Text>
              <Text style={tw`text-sm`}>
                Earn up to $800 per month by sharing it{" "}
              </Text>
            </View>
          </View>
        </View>
        {/* Background image section end */}

        {/* Data two start  */}
        <FlatList
          data={accountData2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={tw` mb-3 flex flex-row items-center justify-between border-gray-200 border-b-2 pb-3`}
            >
              <View style={tw`flex flex-row items-center`}>
                <Icon
                  name={item.icon_name}
                  type={item.icon_type}
                  size={20}
                  color="black"
                />
                <Text style={tw`ml-3 text-sm`}>{item.name}</Text>
              </View>
              <Icon
                name="arrow-forward-ios"
                type="material"
                size={20}
                color="gray"
              />
            </View>
          )}
        />
        {/* Data two end  */}
      </View>
      {/* <BottomBar /> */}
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({});
