import { StyleSheet, Text, View } from "react-native";
import ProgressLoader from "rn-progress-loader";
import React from "react";

const Loader = ({ loading }) => {
  return (
    <View>
      {loading && (
        <ProgressLoader
          visible={loading && true}
          isModal={true}
          isHUD={true}
          hudColor={"#fff"}
          color={"#000"}
        />
      )}
    </View>
  );
};

export default Loader;
