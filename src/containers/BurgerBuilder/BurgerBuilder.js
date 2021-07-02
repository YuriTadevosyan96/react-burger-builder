import React, { Component } from 'react';

import { roundTwoDecimalPlaces } from '../../helpers';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

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
    purchasing: false,
  };

  isPurchasable = (ingredients) => {
    return Object.values(ingredients).reduce((total, amount) => total + amount, 0) > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('You continue');
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
        totalPrice: roundTwoDecimalPlaces(newTotalPrice),
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
          totalPrice: roundTwoDecimalPlaces(newTotalPrice),
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
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummery
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          disabledInfo={disabledInfo}
          onAddIngredient={this.addIngredientHandler}
          onRemoveIngredient={this.removeIngredientHandler}
          isPurchasable={this.isPurchasable(this.state.ingredients)}
          purchaseHandler={this.purchaseHandler}
        />
      </>
    );
  }
}
