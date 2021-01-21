import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface TitleContainerProps {
  text: string;
}

const TitleContainer = ({ text }: TitleContainerProps) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    borderRadius: 7,
    backgroundColor: "#a6a6a6",
    bottom: "10%",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.0,
    elevation: 10,
    minWidth: 200,
    padding: 15,
    minHeight: 80,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    borderColor: "grey",
    borderWidth: 3,
  },
  text: {
    alignSelf: "flex-start",
    fontSize: 28,
    color: "white",
  },
});

export default TitleContainer;
