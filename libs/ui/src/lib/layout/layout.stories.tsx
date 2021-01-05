import { Box, Typography } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';

import { Layout, LayoutProps } from './layout';

export default {
  component: Layout,
  title: 'Widgets/Layout',
  decorators: [withNextRouter],
} as Meta;

const Template: Story<LayoutProps> = (args) => (
  <Layout {...args}>
    <Box pt={4}>
      <Typography>Hello World</Typography>
    </Box>
  </Layout>
);

export const Default = Template.bind({});
Default.args = {
  session: {}
};
