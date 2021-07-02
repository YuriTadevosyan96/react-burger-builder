import React from 'react';

import Button from '../../UI/Button/Button';

function OrderSummery(props) {
  const ingredientSummery = Object.entries(props.ingredients).map((ingredient) => {
    const [type, amount] = ingredient;

    if (amount < 1) return null;

    return (
      <li key={type}>
        <span style={{ textTransform: 'capitalize' }}>{type}</span>: {amount}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>{ingredientSummery}</ul>
      <p>
        Total Price: <strong>{props.price}$</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCanceled} buttonType="danger">
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinued} buttonType="success">
        CONTINUE
      </Button>
    </>
  );
}

export default OrderSummery;
