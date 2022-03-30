import { useRef, useState, useEffect } from "react";
import { View, Animated, PanResponder } from "react-native";
import Face from "./Face";
import { styles } from "./CubeStyles";
import { transformOrigin, rotateXY, rotateXZ } from "../../utils";

export default function Cube() {
  const [originPoint, setOriginPoint] = useState({ x: 0, y: 0, z: -150 });
  const test = useRef(new Animated.ValueXY());
  const refViewFront = useRef();
  const refViewBack = useRef();
  const refViewBottom = useRef();
  const refViewLeft = useRef();
  const refViewRight = useRef();
  const refViewTop = useRef();

  const move = (dx, dy) => {
    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, originPoint);
    refViewFront.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, originPoint);
    refViewBack.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, originPoint);
    refViewRight.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, originPoint);
    refViewLeft.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });

    matrix = rotateXZ(dx, dy - 90);
    transformOrigin(matrix, originPoint);
    refViewTop.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });

    matrix = rotateXZ(-dx, dy + 90);
    transformOrigin(matrix, originPoint);
    refViewBottom.current.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] },
    });
  };

  const handlePanResponderMove = (_e, gestureState) => {
    const { dx, dy } = gestureState;
    move(dx, dy);
  };

  const startPositionForCube = () => {
    move(originPoint.x, originPoint.y);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: (e, gestureState) => {
      const { dx, dy } = gestureState;
      console.log(refViewBack.current)
    },
  });

  useEffect(() => {
    startPositionForCube();
  }, []);

  return (
    <View style={styles.container}>
      <Face
        refView={refViewBack}
        styles={[styles.rectangle, { backgroundColor: "#8697df" }]}
        panResponder={panResponder}
      />
      <Face
        refView={refViewFront}
        styles={[styles.rectangle, { backgroundColor: "#4c72e0" }]}
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
