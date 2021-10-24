import React, { useMemo, useState } from "react";
import { Dimensions, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { getCentsToMoney } from "../../formatters/money";
import { Box } from "../Box";
import { Label } from "../Label";
import Space from "../Space";

const { width } = Dimensions.get("screen");

const PADDING_GLOBAL = 24;
const WIDTH_CREDIT_CARD = width - PADDING_GLOBAL - PADDING_GLOBAL;
const HEIGHT_CREDIT_CARD = width * 0.48;
const TIME_ANIMATION_CHANGE_FACE = 400;

export interface CreditCardProps extends ViewProps {
  backgroundColor: string;
  creditCardNumber: number;
  flag: string;
  dueDate: string;
  amount: number;
  cvv: string;
}

export const CreditCard = ({
  backgroundColor,
  creditCardNumber,
  flag,
  dueDate,
  amount,
  cvv,
}: CreditCardProps) => {
  const [isVerse, setIsVerse] = useState(false);
  const numberCreditCardFormated = useMemo(() => {
    return creditCardNumber
      .toString()
      .match(/.{1,4}/g)
      ?.join(" ") as string;
  }, [creditCardNumber]);

  const amountFormated = useMemo(() => {
    return getCentsToMoney(amount);
  }, []);

  const dueDateFormatted = useMemo(() => {
    return dueDate || "Data inválida";
  }, [dueDate]);

  const rotateXCreditCard = useSharedValue(0);

  const stylesCreditCard = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateX: `${rotateXCreditCard.value}deg`,
        },
      ],
    };
  }, []);

  const handleToChangeFace = () => {
    setTimeout(() => {
      setIsVerse((value) => !value);
    }, TIME_ANIMATION_CHANGE_FACE);

    rotateXCreditCard.value = withSequence(
      withTiming(90, {
        duration: TIME_ANIMATION_CHANGE_FACE,
      }),
      withTiming(0, {
        duration: TIME_ANIMATION_CHANGE_FACE,
      })
    );
  };
  return (
    <TouchableOpacity onPress={handleToChangeFace} activeOpacity={1}>
      <Animated.View
        style={[
          {
            width: WIDTH_CREDIT_CARD,
            height: HEIGHT_CREDIT_CARD,
            padding: 24,
            backgroundColor: backgroundColor,
            justifyContent: "space-between",
            borderRadius: 16,
          },
          stylesCreditCard,
        ]}
      >
        {isVerse ? (
          <Box
            style={{
              alignItems: "flex-end",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Box
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                width: WIDTH_CREDIT_CARD,
                height: 30,
                marginHorizontal: -24,
              }}
            />
            <Space size={16} type="vertical" />
            <Label type="plan">{`CVV ${cvv}`}</Label>
            <Space size={16} type="vertical" />
            <Label type="support">{flag}</Label>
          </Box>
        ) : (
          <>
            <Box>
              <Box row style={{ justifyContent: "space-between" }}>
                <Label type="support">Cartão de pagamento</Label>
                <Label type="label">{flag}</Label>
              </Box>
              <Space type="vertical" size={8} />
              <Label type="subtitle">{numberCreditCardFormated}</Label>
            </Box>
            <Box
              row
              style={{
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Label type="subtitle">{`R$ ${amountFormated}`}</Label>
              <Label type="support">{dueDateFormatted}</Label>
            </Box>
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
