import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Animated as AnimatedReactNative } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Box } from "../../components/Box";
import { CreditCard, CreditCardProps } from "../../components/CreditCard";
import { Icon } from "../../components/Icon";
import { Label } from "../../components/Label";
import Space from "../../components/Space";
import { TransactionItemProps } from "../../components/TransactionItem";
import {
  TransactionList,
  TransactionListProps,
} from "../../components/TransactionList";
const { width } = Dimensions.get("screen");

class BlurhashComponent extends React.Component<TransactionListProps> {
  constructor(props: TransactionListProps) {
    super(props);
  }
  render() {
    return <TransactionList {...this.props} />;
  }
}
const TransationListAnimated =
  Animated.createAnimatedComponent(BlurhashComponent);

const CreditCardScroll = AnimatedReactNative.createAnimatedComponent(FlatList);
interface MainPageLayoutProps {
  transactions: (TransactionItemProps & { nCard: number })[];
  nCard: number;
  setNCard: (n: number) => void;
}
const PADDING_GLOBAL = 24;
const WIDTH_CREDIT_CARD = width - PADDING_GLOBAL - PADDING_GLOBAL;

export const MainPageLayout = ({
  transactions,
  nCard,
  setNCard,
}: MainPageLayoutProps) => {
  const [notListComponentHeight, setNotListComponentHeight] = useState(0);
  const scrollOffsetY = useSharedValue(0);
  const scrollOffsetX = useRef(new AnimatedReactNative.Value(0)).current;
  // const opacityCreditCard = useSharedValue(1);

  const hearderStyles = useAnimatedStyle(() => {
    return {
      top: interpolate(
        scrollOffsetY.value,
        [0, notListComponentHeight],
        [0, -notListComponentHeight],
        Extrapolate.CLAMP
      ),
    };
  });

  const scrollHandlerTransactionList = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffsetY.value = event.contentOffset.y;
    },
  });

  const transactionListStyle = useAnimatedStyle(() => {
    return {
      opacity: 1,
      //   interpolate(
      //   scrollOffsetX.value,
      //   [0, width * 0.25, width * 0.5, width * 0.75, width],
      //   [1, 0, 0, 0, 1, 0, 1],
      //   Extrapolate.CLAMP
      // ),
    };
  });

  // const scrollHandlerScrollCreditCard = useAnimatedScrollHandler({
  //   onScroll: (event) => {
  //     scrollOffsetX.value = event.contentOffset.x;
  //     console.log("scrollOffsetX.value", scrollOffsetX.value);
  //   },
  // });

  // const creditCardStyles = useAnimatedStyle(() => {
  //   return {
  //     opacity: opacityCreditCard.value,
  //   };
  // });

  const amoutQuant = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.nCard == nCard)
      .reduce((acc, m) => {
        return acc + (m.type == "gain" ? +m.amount : -m.amount);
      }, 0);
  }, []);

  const transactionsFilterByNCard = useMemo(() => {
    return transactions.filter((transaction) => transaction.nCard === nCard);
  }, [transactions]);

  return (
    <Box
      style={{
        padding: 24,
        paddingBottom: 0,
        backgroundColor: "#181717",
        flex: 1,
      }}
    >
      <Animated.View
        onLayout={(e) => {
          setNotListComponentHeight(e.nativeEvent.layout.height);
        }}
        style={[
          {
            position: "absolute",
            width: width,
            padding: 24,
          },
          hearderStyles,
        ]}
      >
        <Label type="support">Terça feira 23/10</Label>
        <Space type="vertical" size={16} />
        <Box
          row
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Label type="title">Allan Cardoso</Label>
          <Box
            style={{
              borderRadius: 100,
              width: 32,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <Icon name="person" color="white" size={16} />
          </Box>
        </Box>
        <Space type="vertical" size={16} />

        <CreditCardScroll
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          //@ts-ignore
          keyExtractor={(item: CreditCardProps) =>
            item.creditCardNumber.toString() + item.backgroundColor
          }
          showsHorizontalScrollIndicator={false}
          onScroll={AnimatedReactNative.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollOffsetX } },
              },
            ],
            {
              useNativeDriver: true,
            }
          )}
          snapToInterval={WIDTH_CREDIT_CARD}
          decelerationRate={"fast"}
          style={{
            marginHorizontal: -24,
            flexGrow: 0,
          }}
          contentContainerStyle={{
            paddingHorizontal: 24,
          }}
          data={
            [
              {
                backgroundColor: "red",
                creditCardNumber: 1234123412341234,
                flag: "Mastercard",
                amount: amoutQuant,
                dueDate: "02/2024",
                cvv: "990",
              },
              {
                backgroundColor: "purple",
                creditCardNumber: 9999999999999988,
                flag: "Visa",
                amount: amoutQuant,
                dueDate: "05/2030",
                cvv: "123",
              },
              {
                backgroundColor: "green",
                creditCardNumber: 1234123412341234,
                flag: "Mastercard",
                amount: amoutQuant,
                dueDate: "09/2027",
                cvv: "456",
              },
            ] as CreditCardProps[]
          }
          renderItem={({ item, index }) => {
            const info = item as CreditCardProps;
            const inputRange = [
              Math.floor((index - 1) * WIDTH_CREDIT_CARD),
              Math.floor(index * WIDTH_CREDIT_CARD),
              Math.floor((index + 1) * WIDTH_CREDIT_CARD),
            ];

            const opacity = scrollOffsetX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });
            const scale = scrollOffsetX.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
            });
            return (
              <AnimatedReactNative.View
                style={{
                  opacity,
                  transform: [
                    {
                      scale,
                    },
                  ],
                }}
              >
                <CreditCard
                  backgroundColor={info.backgroundColor}
                  creditCardNumber={info.creditCardNumber}
                  flag={info.flag}
                  amount={amoutQuant}
                  dueDate={info.dueDate}
                  cvv={info.cvv}
                />
              </AnimatedReactNative.View>
            );
          }}
        />

        {/* <Animated.View>
            <CreditCard
              backgroundColor="red"
              creditCardNumber={1234123412341234}
              flag="Mastercard"
              amount={amoutQuant}
              dueDate="02/2024"
              cvv="990"
            />
          </Animated.View>
          <Animated.View>
            <CreditCard
              backgroundColor="purple"
              creditCardNumber={9999999999998888}
              flag="Visa"
              amount={230000}
              dueDate="02/2024"
              cvv="123"
            />
          </Animated.View>
          <Animated.View>
            <CreditCard
              backgroundColor="green"
              creditCardNumber={9876987698769876}
              flag="Mastercard"
              amount={56700}
              dueDate="02/2024"
              cvv="456"
            />
          </Animated.View>
        </CreditCardScroll> */}
        <Space type="vertical" size={32} />
      </Animated.View>
      <TransationListAnimated
        style={transactionListStyle}
        scrollEventThrottle={16}
        transitionsItem={transactionsFilterByNCard}
        onScroll={scrollHandlerTransactionList}
        contentContainerStyle={{
          paddingTop: notListComponentHeight - 32,
        }}
      />
    </Box>
  );
};
