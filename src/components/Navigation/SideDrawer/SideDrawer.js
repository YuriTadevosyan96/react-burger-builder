import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

function SideDrawer(props) {
  const appliedClasses = [classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ');

  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={appliedClasses}>
        <Logo height="11%" />
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </>
  );
}

export default SideDrawer;
