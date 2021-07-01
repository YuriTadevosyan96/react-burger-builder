import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
];

function BuildControls({ onAddIngredient, onRemoveIngredient, disabledInfo, price }) {
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
    </div>
  );
}

export default BuildControls;
