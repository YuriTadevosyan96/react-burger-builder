import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.module.css';

function BuildControl({ label, onAddIngredient, onRemoveIngredient, disabled }) {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button disabled={disabled} onClick={onRemoveIngredient} className={classes.Less}>
        Less
      </button>
      <button onClick={onAddIngredient} className={classes.More}>
        More
      </button>
    </div>
  );
}

BuildControl.propTypes = {
  label: PropTypes.oneOf(['Cheese', 'Meat', 'Salad', 'Bacon']),
};

export default BuildControl;
