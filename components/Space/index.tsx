import React from "react";
import { View } from "react-native";

// import { Container } from './styles';
interface SpaceProps {
  type: "vertical" | "horizontal";
  size: 8 | 12 | 16 | 24 | 32;
}

const Space = ({ type, size }: SpaceProps) => {
  const styles = {
    width: type == "horizontal" ? size : 0,
    height: type == "vertical" ? size : 0,
  };
  return <View style={styles} />;
};

export default Space;
