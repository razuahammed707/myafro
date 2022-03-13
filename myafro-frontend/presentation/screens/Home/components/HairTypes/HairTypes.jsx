/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import {
  getUserHomeAPIQueries,
  userHomeSelector,
} from "../../../../../redux/slices/user/userHomeSlice";

function HairTypes() {
  const [hairTypes, setHairTypes] = useState([]);
  const { queries } = useSelector(userHomeSelector);
  const dispatch = useDispatch();

  const handleChecked = (id) => {
    if (id) {
      setHairTypes([...hairTypes, id]);
      for (let hairType = 0; hairType < hairTypes.length; hairType++) {
        if (hairTypes[hairType] === id) {
          hairTypes.splice(hairType, 1);
          setHairTypes([...hairTypes]);
        }
      }
    }
  };

  useEffect(() => {
    dispatch(
      getUserHomeAPIQueries({ ...queries, hair_type: hairTypes.toString() })
    );
  }, [hairTypes]);

  return (
    <View style={tw`flex flex-row flex-wrap items-center  mt-5`}>
      <Button
        type="clear"
        buttonStyle={{
          backgroundColor: "#282828",
          // borderRadius: 24,
          padding: 15,
        }}
        titleStyle={{ color: "#fff", fontSize: 16 }}
        title="Full Afro"
        onPress={() => handleChecked("Full Afro")}
      />
      <Button
        type="clear"
        buttonStyle={{
          backgroundColor: "#282828",
          // borderRadius: 24,
          padding: 15,
        }}
        titleStyle={{ color: "#fff", fontSize: 16 }}
        title="Technicolor Full Afro"
        onPress={() => handleChecked("Technicolor Full Afro")}
      />
      <Button
        type="clear"
        buttonStyle={{
          backgroundColor: "#282828",
          // borderRadius: 24,
          padding: 15,
        }}
        titleStyle={{ color: "#fff", fontSize: 16 }}
        title=" Medium ‘Fro"
        onPress={() => handleChecked("Medium ‘Fro")}
      />
      <Button
        type="clear"
        buttonStyle={{
          backgroundColor: "#282828",
          // borderRadius: 24,
          padding: 15,
        }}
        titleStyle={{ color: "#fff", fontSize: 16 }}
        title="Center Part"
        onPress={() => handleChecked("Center Part")}
      />
      <Button
        type="clear"
        buttonStyle={{
          backgroundColor: "#282828",
          // borderRadius: 24,
          padding: 15,
        }}
        titleStyle={{ color: "#fff", fontSize: 16 }}
        title="Mini Ponytail Afro Hairstyles"
        onPress={() => handleChecked("Mini Ponytail Afro Hairstyles")}
      />
      <Button
        type="clear"
        buttonStyle={{
          backgroundColor: "#282828",
          // borderRadius: 24,
          padding: 15,
        }}
        titleStyle={{ color: "#fff", fontSize: 16 }}
        title="Defined Curls and Side Part"
        onPress={() => handleChecked("Defined Curls and Side Part")}
      />
    </View>
  );
}

export default HairTypes;
