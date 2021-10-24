import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface IconProps {
  name: string;
  color: string;
  size?: number;
}

export const Icon = ({ name, color, size = 24 }: IconProps) => {
  return (
    <Ionicons name={name as any} color={color} style={{ fontSize: size }} />
  );
};
