import React, { Component } from 'react';

import { roundTwoDecimalPlaces } from '../../helpers';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import apiBase from '../../api/apiBase';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.6,
  cheese: 0.4,
  meat: 0.5,
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: null,
      totalPrice: 1,
      purchasing: false,
      loading: false,
      error: false,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    apiBase
      .get('/ingredients.json')
      .then((res) => {
        if (this._isMounted) {
          this.setState({ ingredients: res.data });
        }
      })
      .catch((err) => {
        if (this._isMounted) {
          this.setState({ error: true });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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
    const queryParams = { ...this.state.ingredients, totalPrice: this.state.totalPrice };
    const params = new URLSearchParams(queryParams).toString();
    this.props.history.push({
      pathname: '/checkout',
      search: params,
    });
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
    let disabledInfo;
    if (this.state.ingredients) {
      disabledInfo = { ...this.state.ingredients };
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }

    let orderSummery = <Spinner />;
    let burger = this.state.error ? (
      <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      orderSummery = (
        <OrderSummery
          price={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      );

      burger = (
        <>
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

    if (this.state.loading) {
      orderSummery = <Spinner />;
    }

    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummery}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, apiBase);
