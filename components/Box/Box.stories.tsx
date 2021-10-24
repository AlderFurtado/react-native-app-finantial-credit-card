import React from "react";
import { Box } from ".";
import { storiesOf } from "@storybook/react-native";
import { BackgroundViewCenter } from "../../storybook/decorators/BackgroundViewCenter";
import { Icon } from "../Icon";

storiesOf("Component/Box", module)
  .addDecorator((story) => (
    <BackgroundViewCenter>{story()}</BackgroundViewCenter>
  ))
  .add("Box 40px 40px", () => (
    <Box
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        backgroundColor: "rgba(255,255,255,0.2)",
      }}
    ></Box>
  ));
