import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Overlay } from "react-native-elements";

const AlertBox = () => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Button
        title="Save"
        type="clear"
        buttonStyle={{
          backgroundColor: "#444",
        }}
        titleStyle={{ marginLeft: 10 }}
        icon={<Icon name="edit-2" type="feather" size={20} color="#fff" />}
        iconPosition="left"
        onPress={() => {
          toggleOverlay();
        }}
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.container}>
          <Text style={styles.textPrimary}>Profile is updated successful</Text>
          <Icon name="check-circle" type="feather" size={40} color="green" />
        </View>
        <Button
          title="Close"
          type="clear"
          buttonStyle={{
            backgroundColor: "green",
          }}
          titleStyle={{ marginLeft: 10 }}
          onPress={() => {
            toggleOverlay();
          }}
        />
      </Overlay>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 8,
  },
  textPrimary: {
    fontSize: 20,
    color: "green",
    marginBottom: 20,
  },
});

export default AlertBox;
