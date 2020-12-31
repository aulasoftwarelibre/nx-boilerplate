import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { Sidebar, SidebarProps } from './sidebar';

export default {
  component: Sidebar,
  title: 'Widgets/Sidebar',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: false,
};

export const Open = Template.bind({});
Open.args = {
  open: true,
};
