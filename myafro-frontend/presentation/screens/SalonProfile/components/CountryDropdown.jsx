import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getValues, salonSelector } from "../../../../redux/slices/salon/salonSlice";

const data = [
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "India", value: "India" },
  { label: "China", value: "China" },
];

const CountryDropdown = () => {
  const [value, setValue] = useState(null);
  const { updateSalonData, hairDresserData } = useSelector(salonSelector);

  const dispatch = useDispatch()
  ;
  useEffect(() => {
    dispatch(getValues({ ...updateSalonData, contact: {
        ...updateSalonData.contact,
        country: value || hairDresserData?.contact?.country
    } }));
  }, [value]);
  return (
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
      placeholder="Country"
      searchPlaceholder="Search..."
      value={value || hairDresserData?.contact?.country}
      onChange={(item) => {
        setValue(item.value);
      }}
      // renderLeftIcon={() =>
      //   text === "saloon" && (
      //     <AntDesign style={styles.icon} color="black" name="home" size={15} />
      //   )
      // }
    />
  );
};

export default CountryDropdown;

const styles = StyleSheet.create({
  dropdown: {
    margin: 12,
    height: 40,
    borderColor: "lightgray",
    borderWidth: 0.5,
    padding: 8,
    borderRadius:8,
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
    color: "gray"
  },
  selectedTextStyle: {
    fontSize: 14,
    color:"gray"
  },
  // iconStyle: {
  //   width: 20,
  //   height: 20,
  // },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
});
