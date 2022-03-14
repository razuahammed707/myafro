/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import {
  getUserHomeAPIQueries,
  userHomeSelector,
} from "../../../../../redux/slices/user/userHomeSlice";

function HairTypes() {
  const [hairTypes, setHairTypes] = useState([]);
  const [type1, setType1] = useState(false);
  const [type2, setType2] = useState(false);
  const [type3, setType3] = useState(false);
  const [type4, setType4] = useState(false);
  const [type5, setType5] = useState(false);
  const [type6, setType6] = useState(false);
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
        buttonStyle={type1 ? styles.checkBtn : styles.unCheckBtn}
        titleStyle={type1 ? styles.checkTitle : styles.unCheckTitle}
        title="Full Afro"
        onPress={() => {
          handleChecked("Full Afro");
          setType1(!type1);
        }}
      />
      <Button
        type="clear"
        buttonStyle={type2 ? styles.checkBtn : styles.unCheckBtn}
        titleStyle={type2 ? styles.checkTitle : styles.unCheckTitle}
        title="Technicolor Full Afro"
        onPress={() => {
          handleChecked("Technicolor Full Afro");
          setType2(!type2);
        }}
      />
      <Button
        type="clear"
        buttonStyle={type3 ? styles.checkBtn : styles.unCheckBtn}
        titleStyle={type3 ? styles.checkTitle : styles.unCheckTitle}
        title=" Medium ‘Fro"
        onPress={() => {
          handleChecked("Medium ‘Fro");
          setType3(!type3);
        }}
      />
      <Button
        type="clear"
        buttonStyle={type4 ? styles.checkBtn : styles.unCheckBtn}
        titleStyle={type4 ? styles.checkTitle : styles.unCheckTitle}
        title="Center Part"
        onPress={() => {
          handleChecked("Center Part");
          setType4(!type4);
        }}
      />
      <Button
        type="clear"
        buttonStyle={type5 ? styles.checkBtn : styles.unCheckBtn}
        titleStyle={type5 ? styles.checkTitle : styles.unCheckTitle}
        title="Mini Ponytail Afro Hairstyles"
        onPress={() => {
          handleChecked("Mini Ponytail Afro Hairstyles");
          setType5(!type5);
        }}
      />
      <Button
        type="clear"
        buttonStyle={type6 ? styles.checkBtn : styles.unCheckBtn}
        titleStyle={type6 ? styles.checkTitle : styles.unCheckTitle}
        title="Defined Curls and Side Part"
        onPress={() => {
          handleChecked("Defined Curls and Side Part");
          setType6(!type6);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  checkBtn: {
    backgroundColor: "#282828",
    padding: 15,
    color: "white",
  },
  checkTitle: {
    color: "#fff",
    fontSize: 16,
  },
  unCheckTitle: {
    color: "#222",
    fontSize: 16,
  },
  unCheckBtn: {
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#222",
    borderWidth: 1,
    padding: 15,
  },
});

export default HairTypes;
