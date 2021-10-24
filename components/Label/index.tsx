import React, { useMemo } from "react";
import { Text, TextProps } from "react-native";

interface LabelProps extends TextProps {
  type: "title" | "subtitle" | "plan" | "label" | "support";
  children: string;
}

export const Label = ({ type, children, style }: LabelProps): JSX.Element => {
  const fontSize = useMemo(() => {
    if (type == "title") return 32;
    if (type == "subtitle") return 22;
    if (type == "plan") return 17;
    return 14;
  }, [type]);

  const color = useMemo(() => {
    if (type != "support") return "#fafafa";
    return "#c9c9c9";
  }, [type]);

  return <Text style={[{ fontSize, color }, style]}>{children}</Text>;
};
