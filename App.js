import { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, PanResponder } from "react-native";
import { transformOrigin, rotateXY, rotateXZ } from "./utils";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function App() {
  const refViewFront = useRef()
  const refViewBack = useRef()
  const refViewBottom = useRef()
  const refViewLeft = useRef()
  const refViewRight = useRef()
  const refViewTop = useRef()

  const handlePanResponderMove = (e, gestureState) => {
    const { dx, dy } = gestureState;
    const origin = { x: 0, y: 0, z: -50 };
    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    refViewFront.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, origin);
    refViewBack.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, origin);
    refViewRight.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, origin);
    refViewLeft.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });

    matrix = rotateXZ(dx, dy - 90);
    transformOrigin(matrix, origin);
    refViewTop.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });

    matrix = rotateXZ(-dx, dy + 90);
    transformOrigin(matrix, origin);
    refViewBottom.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  const renderLeft = (color) => {
    return (
      <View
        ref={refViewRight}
        style={[styles.rectangle, color ? { backgroundColor: color } : null]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderRight = (color) => {
    return (
      <View
        ref={refViewLeft}
        style={[styles.rectangle, color ? { backgroundColor: color } : null]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderFront = (color) => {
    return (
      <View
        ref={refViewFront}
        style={[styles.rectangle, color ? { backgroundColor: color } : null]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderBack = (color) => {
    return (
      <View
        ref={refViewBack}
        style={[styles.rectangle, color ? { backgroundColor: color } : null]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderTop = (color) => {
    return (
      <View
        ref={refViewTop}
        style={[styles.rectangle, color ? { backgroundColor: color } : null]}
        {...panResponder.panHandlers}
      />
    );
  };

  const renderBottom = (color) => {
    return (
      <View
        ref={refViewBottom}
        style={[styles.rectangle, color ? { backgroundColor: color } : null]}
        {...panResponder.panHandlers}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderFront("#4c72e0")}
      {renderBack("#8697df")}
      {renderLeft("#b5bce2")}
      {renderRight("#e5afb9")}
      {renderTop("#de7c92")}
      {renderBottom("#d1426b")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: WIDTH / 2 - 50,
    top: HEIGHT / 2 - 50,
    width: 100,
    height: 100,
    backgroundColor: "transparent",
  },
  rectangle: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    zIndex: 10,
  },
});
