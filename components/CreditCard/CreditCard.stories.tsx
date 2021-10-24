import React from "react";
import { CreditCard } from ".";
import { storiesOf } from "@storybook/react-native";
import { BackgroundViewCenter } from "../../storybook/decorators/BackgroundViewCenter";

storiesOf("Component/CreditCard", module)
  .addDecorator((story) => (
    <BackgroundViewCenter>{story()}</BackgroundViewCenter>
  ))
  .add("Positve amount", () => (
    <CreditCard
      backgroundColor="blue"
      creditCardNumber={1234123412341234}
      flag={"Visa"}
      dueDate={"07/27"}
      amount={12341234}
      cvv={"123"}
    />
  ))
  .add("Negative amount", () => (
    <CreditCard
      backgroundColor="blue"
      creditCardNumber={1234123412341234}
      flag={"Visa"}
      dueDate={"07/27"}
      amount={-12341234}
      cvv={"123"}
    />
  ))
  .add("Without due date", () => (
    <CreditCard
      backgroundColor="blue"
      creditCardNumber={1234123412341234}
      flag={"Visa"}
      dueDate={""}
      amount={-12341234}
      cvv={"123"}
    />
  ));
