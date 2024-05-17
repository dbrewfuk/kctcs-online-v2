import type { Meta, Story } from "@storybook/react";
import StudentStoryFeature from "./StudentStoryFeature";

const meta: Meta = {
  title: "Components/StudentStoryFeature",
  component: StudentStoryFeature,
  // Add any other parameters you need
};

export default meta;

type StoryArgs = {};

const Template: Story<StoryArgs> = (args) => <StudentStoryFeature {...args} />;

export const Default: Story<StoryArgs> = Template.bind({});
