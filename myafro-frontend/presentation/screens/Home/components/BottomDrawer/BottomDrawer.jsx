import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import {
  getUserHomeAPIQueries,
  userHomeSelector,
} from "../../../../../redux/slices/user/userHomeSlice";
import HairTypes from "../HairTypes/HairTypes";

const BottomDrawer = ({ hair, home }) => {
  // Needed in order to use .show()
  const bottomSheet = useRef();
  const [salonType, setSalonType] = useState("");
  const { queries } = useSelector(userHomeSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserHomeAPIQueries({ ...queries, salon_type: salonType }));
  }, [salonType]);

  return (
    <SafeAreaView style={styles.container}>
      {hair === "hair" ? (
        <BottomSheet hasDraggableIcon ref={bottomSheet} height={450}>
          {/* <View style={tw`p-5`}> */}
          <View style={{ position: "relative", height: "100%", padding: 20 }}>
            <Text style={tw`font-bold text-base`}>Hair Type</Text>
            <HairTypes />
            <View style={tw`absolute bottom-8 w-full left-5 right-0`}>
              <View style={tw`flex flex-row items-center justify-center`}>
                <Button
                  buttonStyle={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    borderColor: "#222",
                    borderWidth: 1,
                    padding: 15,
                  }}
                  type="clear"
                  titleStyle={{ color: "#222", fontSize: 16 }}
                  title="Home Saloon"
                />
                <Button
                  type="clear"
                  buttonStyle={{
                    backgroundColor: "#282828",
                    // borderRadius: 24,
                    padding: 15,
                  }}
                  titleStyle={{ color: "#fff", fontSize: 16 }}
                  title="Show results"
                />
              </View>
            </View>
          </View>
          {/* </View> */}
        </BottomSheet>
      ) : (
        <BottomSheet hasDraggableIcon ref={bottomSheet} height={450}>
          <View
            style={{
              position: "relative",
              height: "100%",
              padding: 20,
              maxWidth: "100%",
            }}
          >
            <Text style={tw`font-bold text-base`}>Home Saloon</Text>
            <TouchableOpacity
              onPress={() => setSalonType("Public")}
              style={tw`flex flex-row mt-5 border border-gray-300 p-3 h-auto rounded-lg`}
            >
              <View style={tw`mr-3 h-auto`}>
                <Icon
                  name="wheelchair"
                  type="fontisto"
                  size={28}
                  color="white"
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    borderRadius: 50,
                    backgroundColor: "black",
                  }}
                />
              </View>
              <View style={tw`w-70`}>
                <Text style={tw`font-bold text-sm mb-1`}>Public Salon</Text>
                <Text style={styles.commonText}>
                  Book instantly, even at the last minute. Unlock and lock the
                  car using the app. The keys areinside.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSalonType("Home Salon")}
              style={tw`flex flex-row mt-5 border border-gray-300 p-3 h-auto rounded-lg`}
            >
              <View style={tw`mr-3 h-auto`}>
                <Icon
                  name="wheelchair"
                  type="fontisto"
                  size={28}
                  color="white"
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    borderRadius: 50,
                    backgroundColor: "black",
                  }}
                />
              </View>
              <View style={tw`w-70`}>
                <Text style={tw`font-bold text-sm mb-1`}>Home Salon</Text>
                <Text style={styles.commonText}>
                  Book instantly, even at the last minute. Unlock and lock the
                  car using the app. The keys areinside.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSalonType("Both")}
              style={tw`flex flex-row mt-5 border border-gray-300 p-3 h-auto rounded-lg`}
            >
              <View style={tw`mr-3 h-auto`}>
                <Icon
                  name="wheelchair"
                  type="fontisto"
                  size={28}
                  color="white"
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    borderRadius: 50,
                    backgroundColor: "black",
                  }}
                />
              </View>
              <View style={tw`w-70`}>
                <Text style={tw`font-bold text-sm mb-1`}>Both Salon</Text>
                <Text style={styles.commonText}>
                  Book instantly, even at the last minute. Unlock and lock the
                  car using the app. The keys areinside.
                </Text>
              </View>
            </TouchableOpacity>
            <View style={tw`absolute bottom-8 w-full left-5 right-0`}>
              <View style={tw`flex flex-row items-center justify-center`}>
                <Button
                  buttonStyle={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    borderColor: "#222",
                    borderWidth: 1,
                    padding: 15,
                  }}
                  type="clear"
                  titleStyle={{ color: "#222", fontSize: 16 }}
                  title="Home Saloon"
                />
                <Button
                  type="clear"
                  buttonStyle={{
                    backgroundColor: "#282828",
                    // borderRadius: 24,
                    padding: 15,
                  }}
                  titleStyle={{ color: "#fff", fontSize: 16 }}
                  title="Show results"
                />
              </View>
            </View>
          </View>
        </BottomSheet>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => bottomSheet.current.show()}
      >
        {hair === "hair" ? (
          <>
            <Text style={styles.text}>Hair Type</Text>
            <Icon
              name="arrow-drop-down"
              type="material"
              size={20}
              color="black"
            />
          </>
        ) : (
          <>
            <Icon
              name="home"
              type="antdesign"
              size={20}
              style={{ marginLeft: 8 }}
              color="black"
            />
            <Text style={styles.text}>{salonType ? salonType : "Home Salon" }</Text>
            <Icon
              name="arrow-drop-down"
              type="material"
              size={24}
              color="black"
            />
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 24,
    // shadowColor: "#8559da",
    // shadowOpacity: 0.7,
    // shadowOffset: {
    //   height: 4,
    //   width: 4,
    // },
    // shadowRadius: 5,
    // elevation: 6,
  },
  text: {
    color: "black",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  commonText: {
    color: "#bdbdbd",
    fontSize: 12,
    lineHeight: 20,
  },
});

export default BottomDrawer;
