import React from 'react';

import burgerLogo from '../../assets/images/28.1_burger-logo.png';
import classes from './Logo.module.css';

function Logo(props) {
  return (
    <div className={classes.Logo} style={{ height: props.height }}>
      <img src={burgerLogo} alt="Burger Logo" />
    </div>
  );
}

export default Logo;
