import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

function NavigationItems({ isAuth }) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact link="/">
        Burger Builder
      </NavigationItem>
      {isAuth ? (
        <>
          <NavigationItem exact link="/orders">
            Orders
          </NavigationItem>
          <NavigationItem exact link="/logout">
            Log Out
          </NavigationItem>
        </>
      ) : (
        <NavigationItem exact link="/auth">
          Authenticate
        </NavigationItem>
      )}
    </ul>
  );
}

export default NavigationItems;
