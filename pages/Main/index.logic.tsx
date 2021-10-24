import React from "react";
import { useState } from "react";
import { TransactionItemProps } from "../../components/TransactionItem";
import { MainPageLayout } from "./index.layout";
import faker from "faker";

const c = [
  "transport",
  "home",
  "food",
  "shopping",
  "others",
  "transport",
  "home",
  "food",
  "shopping",
  "others",
];

const nCards = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3];
const MOCK = Array(10)
  .fill("")
  .map((_, index) => {
    return {
      description: faker.company.companyName(),
      info: faker.date
        .between(
          new Date().toString(),
          new Date().setDate(new Date().getMonth() + 12)
        )
        .toString(),
      type: index / 2 == 0 ? "expanse" : ("gain" as "expanse" | "gain"),
      category: c[index] as
        | "transport"
        | "home"
        | "food"
        | "shopping"
        | "others",
      amount: faker.datatype.number(10000),
      nCard: nCards[index],
    };
  });

export const MainPage = () => {
  const [transaction, setTransaction] =
    useState<(TransactionItemProps & { nCard: number })[]>(MOCK);

  const [nCard, setNCard] = useState(1);
  return (
    <MainPageLayout
      transactions={transaction}
      nCard={nCard}
      setNCard={setNCard}
    />
  );
};
