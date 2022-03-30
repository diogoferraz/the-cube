import { StyleSheet, Dimensions } from "react-native";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    container: {
      position: "absolute",
      left: WIDTH / 2 - 150,
      top: HEIGHT / 2 - 150,
      width: 100,
      height: 100,
      backgroundColor: "transparent",
    },
    rectangle: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 300,
      height: 300,
      zIndex: 10,
    },
  });
  