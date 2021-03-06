import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

function Toolbar(props) {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle click={props.sideDrawerToggle} />
      <Logo height="80%" />
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </header>
  );
}

export default Toolbar;
