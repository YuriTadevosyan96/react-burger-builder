import React from 'react';

import hamburger from '../../../../assets/images/hamburger.svg';
import classes from './DrawerToggle.module.css';

function DrawerToggle({ click, styling }) {
  return (
    <img
      style={styling}
      onClick={click}
      className={classes.DrawerToggle}
      src={hamburger}
      alt="Hamburger Icon"
    />
  );
}

export default DrawerToggle;
