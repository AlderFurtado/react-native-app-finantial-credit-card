import React, { useMemo } from "react";
import { getCentsToMoney } from "../../formatters/money";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Label } from "../Label";
import Space from "../Space";

export interface TransactionItemProps {
  category: "transport" | "home" | "food" | "shopping" | "others";
  type: "gain" | "expanse";
  description: string;
  info: string;
  amount: number;
}

export const TransactionItem = ({
  category,
  type,
  description,
  info,
  amount,
}: TransactionItemProps) => {
  const icon = useMemo(() => {
    if (category == "transport")
      return { name: "md-airplane-sharp", color: "blue" };
    if (category == "food") return { name: "fast-food-sharp", color: "red" };
    if (category == "home") return { name: "ios-home", color: "green" };
    if (category == "shopping") return { name: "glasses", color: "purple" };
    return { name: "", color: "black" };
  }, [category]);

  const amountFormatted = useMemo(() => {
    return getCentsToMoney(amount);
  }, [amount]);

  const descriptionFormatted = useMemo(() => {
    if (description.length > 20) return description.substring(0, 15) + "...";
    return description;
  }, [description]);

  return (
    <Box
      row
      style={{ justifyContent: "space-between", height: 60, width: "100%" }}
    >
      <Box row style={{ flex: 1 }}>
        <Box
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 60,
            width: 60,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 12,
          }}
        >
          <Icon name={icon.name} color={icon.color} />
        </Box>
        <Space size={16} type="horizontal" />
        <Box style={{ justifyContent: "space-between" }}>
          <Box row style={{ alignItems: "center" }}>
            <Label type="plan" style={{ fontWeight: "bold", fontSize: 20 }}>
              {descriptionFormatted}
            </Label>
            <Space size={8} type="horizontal" />
            <Box
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 100,
              }}
            >
              <Icon
                name={
                  type == "gain" ? "arrow-up-outline" : "arrow-down-outline"
                }
                size={12}
                color="white"
              ></Icon>
            </Box>
          </Box>
          <Label type="plan" style={{ fontSize: 16, color: "grey" }}>
            {info}
          </Label>
        </Box>
      </Box>
      <Label type="subtitle" style={{ fontWeight: "bold" }}>{`${
        type == "gain" ? "+" : "-"
      } $${amountFormatted}`}</Label>
    </Box>
  );
};
