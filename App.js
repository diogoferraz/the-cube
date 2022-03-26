import { useRef } from "react";
import { StyleSheet, Text, View, Dimensions, PanResponder } from "react-native";
import Face from "./src/components/Face";
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

  return (
    <View style={styles.container}>
      <Face
        refView={refViewFront}
        styles={[styles.rectangle, { backgroundColor: "#4c72e0" }]}
        panResponder={panResponder}
      />
      <Face
        refView={refViewBack}
        styles={[styles.rectangle, { backgroundColor: "#8697df" }]}
        panResponder={panResponder}
      />
      <Face
        refView={refViewLeft}
        styles={[styles.rectangle, { backgroundColor: "#b5bce2" }]}
        panResponder={panResponder}
      />
      <Face
        refView={refViewRight}
        styles={[styles.rectangle, { backgroundColor: "#e5afb9" }]}
        panResponder={panResponder}
      />
      <Face
        refView={refViewTop}
        styles={[styles.rectangle, { backgroundColor: "#de7c92" }]}
        panResponder={panResponder}
      />
      <Face
        refView={refViewBottom}
        styles={[styles.rectangle, { backgroundColor: "#d1426b" }]}
        panResponder={panResponder}
      />
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
    backgroundColor: "red",
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
