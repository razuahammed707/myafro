import Accordion from "react-native-collapsible/Accordion";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import SalonServices from "./SalonServices";
import SingleInput from "./SingleInput";
import SalonMedia from "./SalonMedia";
import Features from "./Features";
import SalonDetails from "./SalonDetails";
import ContactDetails from "./ContactDetails";
import { useState } from "react";
import MapAutocomplete from "../../Map/MapAutocomplete/MapAutocomplete";
import SalonMap from "../../Map/SalonMap";

const ProfileAccordion = () => {
  const SECTIONS = [
    {
      title: "Salon Details",
      icon_name: "edit-3",
      icon_type: "feather",
      content: <SalonDetails />,
    },
    {
      title: "Contact Details",
      icon_name: "contacts",
      icon_type: "antdesign",
      content: <ContactDetails />,
    },
    {
      title: "Location",
      icon_name: "location",
      icon_type: "evilicon",
      content: <MapAutocomplete />,
    },
    {
      title: "Media",
      icon_name: "image",
      icon_type: "feather",
      content: <SalonMedia />,
    },
    {
      title: "Services",
      icon_name: "settings",
      icon_type: "feather",
      content: <SalonServices />,
    },
    {
      title: "Features",
      icon_name: "feather",
      icon_type: "feather",
      content: <Features />,
    },
    // {
    //   title: "Optional",
    //   icon_name: "smile",
    //   icon_type: "feather",
    //   content: <SingleInput text="Edit optional" />,
    // },
  ];
  const [activeSections, setActiveSections] = useState([]);
  const renderHeader = (section) => {
    return (
      <View
        style={tw`p-5 border-b border-gray-200 flex flex-row items-center justify-between`}
      >
        <View style={tw`flex flex-row items-center`}>
          <Icon
            name={section.icon_name}
            type={section.icon_type}
            size={18}
            color="gray"
          />
          <Text style={tw`text-base font-semibold ml-2`}>{section.title}</Text>
        </View>
        <Icon name="chevron-down" type="feather" size={16} color="gray" />
      </View>
    );
  };

  const renderContent = (section) => {
    return <View style={tw` pt-1`}>{section.content}</View>;
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };
  return (
    <Accordion
      sections={SECTIONS}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      underlayColor={"lightgray"}
      onChange={updateSections}
      containerStyle={{height:"100%"}}
    />
  );
};

export default ProfileAccordion;
