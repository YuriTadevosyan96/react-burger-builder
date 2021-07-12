import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
];

function BuildControls({
  onAddIngredient,
  onPurchaseInit,
  onRemoveIngredient,
  disabledInfo,
  price,
  isPurchasable,
  purchaseHandler,
}) {
  const handleOrder = () => {
    purchaseHandler();
    onPurchaseInit();
  };

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{price}$</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          onAddIngredient={() => onAddIngredient(ctrl.type)}
          onRemoveIngredient={() => onRemoveIngredient(ctrl.type)}
          disabled={disabledInfo[ctrl.type]}
          key={ctrl.label}
          label={ctrl.label}
        />
      ))}
      <button onClick={handleOrder} disabled={!isPurchasable} className={classes.OrderButton}>
        ORDER NOW
      </button>
    </div>
  );
}

export default BuildControls;
