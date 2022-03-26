import React from "react";
import {
  View,
} from "react-native";

export default function Face({ refView, styles, panResponder }) {
  return (
    <View
      ref={refView}
      style={styles}
      {...panResponder.panHandlers}
    />
  );
}
