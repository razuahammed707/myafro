import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DatePicker from "react-native-date-picker";

const CheckOutDate = () => {
  const [date, setDate] = React.useState(new Date());
  return <DatePicker date={date} onDateChange={setDate} />;
};

export default CheckOutDate;

const styles = StyleSheet.create({});
