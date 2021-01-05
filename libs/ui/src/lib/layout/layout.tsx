import {
  Box,
  Container,
  CssBaseline,
  Drawer,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { Session } from 'next-auth';
import React from 'react';

import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { useStyles } from '../theme';

export interface LayoutProps {
  session?: Session
}

export const Layout: React.FunctionComponent<LayoutProps> = ({session, children}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        open={open}
        session={session}
        onOpenSidebar={() => setOpen(true)}
      />
      <Sidebar open={open} onCloseSidebar={() => setOpen(false)} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
}

export default Layout;
