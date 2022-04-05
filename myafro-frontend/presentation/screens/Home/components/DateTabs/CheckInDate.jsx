import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import DatePicker from "react-native-date-picker";
import { Button } from "react-native-elements";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getDateTimes,
  mapSelector,
} from "../../../../../redux/slices/map/mapSlice";

const CheckInDate = () => {
  const [date, setDate] = React.useState(new Date());
  const dispatch = useDispatch();
  const { times } = useSelector(mapSelector);

  // useEffect(() => {
  //   dispatch(getDateTimes({
  //     ...times,
  //     checkIn: moment(date).format('lll')
  //   }))

  // }, [date])

  console.log(times);
  return (
    <>
      <DatePicker date={date} onDateChange={setDate} />
      <Button
        title="Confirm"
        buttonStyle={{ marginTop: 50 }}
        onPress={() => {
          dispatch(
            getDateTimes({
              ...times,
              checkIn: moment(date).format("lll"),
            })
          );
        }}
      />
    </>
  );
};

export default CheckInDate;

const styles = StyleSheet.create({});
