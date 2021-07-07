import React from 'react';

import classes from './Order.module.css';

function Order(props) {
  const renderedIngredients = Object.entries(props.ingredients).map((ingredient) => {
    const [type, amount] = ingredient;
    return (
      <li key={type}>
        <span style={{ textTransform: 'capitalize' }}>{type}: </span>
        {amount}
      </li>
    );
  });

  return (
    <div className={classes.Order}>
      <h4>Ingredients</h4>
      <ul>{renderedIngredients}</ul>
      <p>
        Price: <strong>USD {props.price}</strong>
      </p>
    </div>
  );
}

export default Order;
