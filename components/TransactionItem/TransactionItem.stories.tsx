import React from "react";
import { TransactionItem } from ".";
import { storiesOf } from "@storybook/react-native";
import { BackgroundViewCenter } from "../../storybook/decorators/BackgroundViewCenter";

storiesOf("Component/TransactionItem", module)
  .addDecorator((story) => (
    <BackgroundViewCenter>{story()}</BackgroundViewCenter>
  ))
  .add("Category food Type expanse", () => (
    <TransactionItem
      description={"Cia da pizza"}
      info="12 Dez 2021 10:32"
      type="expanse"
      amount={5500}
      category={"food"}
    />
  ))
  .add("Category transport Type gain", () => (
    <TransactionItem
      description={"Viagem de Belém-Paris"}
      info="25 Dez 2021 00:00"
      type="gain"
      amount={23000}
      category={"transport"}
    />
  ))
  .add("Category home Type gain", () => (
    <TransactionItem
      description={"Produtos de higiene"}
      info="24 Dez 2021 13:30"
      type="gain"
      amount={23000}
      category={"home"}
    />
  ));
