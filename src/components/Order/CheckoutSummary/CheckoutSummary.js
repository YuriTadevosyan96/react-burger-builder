import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

function CheckoutSummary(props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h2>We hope it tastes well!</h2>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.checkoutCanceled} buttonType="danger">
        CANCEL
      </Button>
      <Button clicked={props.checkoutContinued} buttonType="success">
        CONTINUE
      </Button>
    </div>
  );
}

export default CheckoutSummary;
