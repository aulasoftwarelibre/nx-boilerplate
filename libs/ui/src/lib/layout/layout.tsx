import {
  Box,
  Container,
  CssBaseline,
  Drawer,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { useSession } from 'next-auth/client';
import React from 'react';

import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { useStyles } from '../theme';

/* eslint-disable-next-line */
export interface LayoutProps {}

export function Layout({ children }: React.PropsWithChildren<LayoutProps>) {
  const classes = useStyles();
  const [session] = useSession();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.debug('session', session);
  }, [session]);

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
