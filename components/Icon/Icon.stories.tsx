import React from "react";
import { Icon } from ".";
import { storiesOf } from "@storybook/react-native";
import { BackgroundViewCenter } from "../../storybook/decorators/BackgroundViewCenter";

storiesOf("Component/Icon", module)
  .addDecorator((story) => (
    <BackgroundViewCenter>{story()}</BackgroundViewCenter>
  ))
  .add("Size default white", () => <Icon name="home" color="white" />)
  .add("42 Size white", () => <Icon name="home" color="white" size={42} />);
