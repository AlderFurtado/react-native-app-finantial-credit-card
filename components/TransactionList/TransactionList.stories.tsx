import React from "react";
import { TransactionList } from ".";
import { storiesOf } from "@storybook/react-native";
import { BackgroundViewCenter } from "../../storybook/decorators/BackgroundViewCenter";
import { TransactionItem, TransactionItemProps } from "../TransactionItem";

const mock = [
  {
    description: "Cia da pizza",
    info: "12 Dez 2021 10:32",
    type: "expanse",
    amount: 5500,
    category: "food",
  },
  {
    description: "Viagem de Belém-Paris",
    info: "25 Dez 2021 00:00",
    type: "gain",
    amount: 23000,
    category: "transport",
  },

  {
    description: "Produtos de higiene",
    info: "24 Dez 2021 13:30",
    type: "gain",
    amount: 23000,
    category: "home",
  },
] as TransactionItemProps[];

storiesOf("Component/TransactionList", module)
  .addDecorator((story) => (
    <BackgroundViewCenter>{story()}</BackgroundViewCenter>
  ))
  .add("Default", () => <TransactionList transitionsItem={mock} />)
  .add("Empty", () => <TransactionList transitionsItem={[]} />);
