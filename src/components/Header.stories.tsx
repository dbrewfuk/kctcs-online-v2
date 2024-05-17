import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Header, { HeaderProps } from "./Header";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add any props you want to pass to the Header component
};
