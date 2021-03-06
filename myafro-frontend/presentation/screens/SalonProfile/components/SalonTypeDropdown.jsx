import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  getValues,
  salonSelector,
} from "../../../../redux/slices/salon/salonSlice";

const data = [
  { label: "Public", value: "Public" },
  { label: "Home Salon", value: "Home Salon" },
  { label: "both", value: "Both" },
];

const SalonTypeDropdown = () => {
  const [value, setValue] = useState(null);
  const { updateSalonData, hairDresserData } = useSelector(salonSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getValues({
        ...updateSalonData,
        salon_type: value || hairDresserData?.salon_type,
      })
    );
  }, [value]);

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Salon type"
        searchPlaceholder="Search..."
        value={hairDresserData?.salon_type || value}
        onChange={(item) => {
          setValue(item.value);
        }}
        // renderLeftIcon={() =>
        //   text === "saloon" && (
        //     <AntDesign style={styles.icon} color="black" name="home" size={15} />
        //   )
        // }
      />
    </View>
  );
};

export default SalonTypeDropdown;

const styles = StyleSheet.create({
  dropdown: {
    margin: 12,
    height: 40,
    borderColor: "lightgray",
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 8,
  },
  dropdownHair: {
    margin: 16,
    height: 50,
    borderColor: "lightgray",
    borderWidth: 0.5,
    borderRadius: 20,
    width: 120,
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "gray",
  },
  // iconStyle: {
  //   width: 20,
  //   height: 20,
  // },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
