import React from "react";
import { View, ViewProps } from "react-native";

interface BoxProps extends ViewProps {
  row?: boolean;
}

export const Box = ({ row, children, style }: BoxProps): JSX.Element => {
  const stylesLocal = {
    flexDirection: row ? "row" : ("column" as "column" | "row"),
  };
  return <View style={[stylesLocal, style]}>{children}</View>;
};
