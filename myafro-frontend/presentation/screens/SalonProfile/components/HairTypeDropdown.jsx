import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getValues,
  salonSelector,
} from "../../../../redux/slices/salon/salonSlice";

const items = [
  {
    id: "Full Afro",
    name: "Full Afro",
  },
  {
    id: "Technicolor Full Afro",
    name: "Technicolor Full Afro",
  },
  {
    id: "Medium ‘Fro",
    name: "Medium ‘Fro",
  },
  {
    id: "Center Part",
    name: "Center Part",
  },
  {
    id: "Mini Ponytail Afro Hairstyles",
    name: "Mini Ponytail Afro Hairstyles",
  },
  {
    id: "Defined Curls and Side Part",
    name: "Defined Curls and Side Part",
  },
];

const HairTypeDropdown = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { updateSalonData, hairDresserData } = useSelector(salonSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getValues({
        ...updateSalonData,
        hair_type: selectedItems[0] ? selectedItems : hairDresserData?.hair_type 
      })
    );
  }, [selectedItems]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  return (
    <>
      <MultiSelect
        styleMainWrapper={{ paddingHorizontal: 20, marginVertical: 10 }}
        styleListContainer={{ paddingBottom: 20 }}
        items={items || hairDresserData?.hair_type}
        uniqueKey={"id" || "_id"}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems[0] ? selectedItems : hairDresserData?.hair_type }
        selectText="Pick Items"
        styleInputGroup={{ padding: 10 }}
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#222"
        tagBorderColor="#222"
        tagTextColor="#222"
        selectedItemTextColor="#888"
        selectedItemIconColor="#34cc64"
        itemTextColor="#000"
        displayKey={"name" || "title"}
        searchInputStyle={{ color: "#222" }}
        submitButtonColor="#222"
        submitButtonText="Submit"
      />
    </>
  );
};

export default HairTypeDropdown;
