import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.6,
  cheese: 0.4,
  meat: 0.5,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 1,
  };

  roundTwoDecimalPlaces = (num) => {
    return +(Math.round(num + 'e+2') + 'e-2');
  };

  addIngredientHandler = (ingredient) => {
    this.setState((prevState) => {
      const { ingredients } = prevState;
      const newTotalPrice = prevState.totalPrice + INGREDIENT_PRICES[ingredient];
      return {
        ingredients: {
          ...ingredients,
          [ingredient]: ingredients[ingredient] + 1,
        },
        totalPrice: this.roundTwoDecimalPlaces(newTotalPrice),
      };
    });
  };

  removeIngredientHandler = (ingredient) => {
    this.setState((prevState) => {
      const { ingredients } = prevState;

      if (ingredients[ingredient] > 0) {
        const newTotalPrice = prevState.totalPrice - INGREDIENT_PRICES[ingredient];
        return {
          ingredients: {
            ...ingredients,
            [ingredient]: ingredients[ingredient] - 1,
          },
          totalPrice: this.roundTwoDecimalPlaces(newTotalPrice),
        };
      }

      return prevState;
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          disabledInfo={disabledInfo}
          onAddIngredient={this.addIngredientHandler}
          onRemoveIngredient={this.removeIngredientHandler}
        />
      </>
    );
  }
}
