import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DatePicker from "react-native-date-picker";

const CheckInDate = () => {
  const [date, setDate] = React.useState(new Date());
  return <DatePicker date={date} onDateChange={setDate} />;
};

export default CheckInDate;

const styles = StyleSheet.create({});
