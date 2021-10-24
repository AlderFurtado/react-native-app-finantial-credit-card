import React from "react";
import { Label } from ".";
import { storiesOf } from "@storybook/react-native";
import { BackgroundViewCenter } from "../../storybook/decorators/BackgroundViewCenter";

storiesOf("Component/Label", module)
  .addDecorator((story) => (
    <BackgroundViewCenter>{story()}</BackgroundViewCenter>
  ))
  .add("Title", () => <Label type="title">Teste</Label>)
  .add("Subtitle", () => <Label type="subtitle">Teste</Label>)
  .add("Label", () => <Label type="label">Teste</Label>)
  .add("Support", () => <Label type="support">Teste</Label>);
