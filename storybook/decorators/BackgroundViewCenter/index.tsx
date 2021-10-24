import React from "react";
import { View } from "react-native";

export const BackgroundViewCenter: React.FC = ({ children }) => {
  return (
    <View
      style={{
        backgroundColor: "#181717",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      {children}
    </View>
  );
};
