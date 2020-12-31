import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Link from 'next/link';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/client';
import React from 'react';

import { useStyles } from '../theme';

/* eslint-disable-next-line */
export interface NavbarProps {
  open: boolean;
  onOpenSidebar: (event: React.MouseEvent) => void;
  session: Session;
}

export function Navbar({
  open,
  onOpenSidebar: onOpenDrawer,
  session,
}: NavbarProps) {
  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onOpenDrawer}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Boilerplate
        </Typography>
        {session && (
          <Link href="/api/auth/signout">
            <Button color="inherit">Logout</Button>
          </Link>
        )}
        {!session && (
          <Link href="/api/auth/signin">
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
