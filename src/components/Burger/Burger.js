import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import PropTypes from 'prop-types';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

function Burger({ ingredients }) {
  const calcPortions = (ingredients) => {
    // make portions based on their provided amount
    // flatten nested arrays
    return Object.entries(ingredients)
      .map((record) => {
        const [ingredient, amount] = record;
        // ingredient portion as array
        return Array(amount)
          .fill()
          .map(() => <BurgerIngredient key={uuidv4()} type={ingredient} />);
      })
      .flat();
  };

  const suppliedIngredients = calcPortions(ingredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {suppliedIngredients.length ? suppliedIngredients : <p>Please Add Ingredients</p>}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

Burger.propTypes = {
  ingredients: PropTypes.exact({
    cheese: PropTypes.number,
    meat: PropTypes.number,
    salad: PropTypes.number,
    bacon: PropTypes.number,
  }),
};

export default Burger;
