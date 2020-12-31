import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { Navbar, NavbarProps } from './navbar';

export default {
  component: Navbar,
  title: 'Widgets/Navbar',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<NavbarProps> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: false,
  session: undefined,
};

export const Open = Template.bind({});
Open.args = {
  open: true,
  session: undefined,
};

export const Logged = Template.bind({});
Logged.args = {
  open: false,
  session: {},
};
