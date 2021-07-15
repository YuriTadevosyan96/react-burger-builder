import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import apiBase from '../../api/apiBase';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { addIngredient, removeIngredient, initIngredients } from '../../store/actions/ingredient';
import { purchaseBurgerInit } from '../../store/actions/order';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchasing: false,
    };
  }

  componentDidMount() {
    this.props.initIngredients();
  }

  isPurchasable = (ingredients) => {
    return Object.values(ingredients).reduce((total, amount) => total + amount, 0) > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    let disabledInfo;
    if (this.props.ingredients) {
      disabledInfo = { ...this.props.ingredients };
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }

    let orderSummery = <Spinner />;
    let burger = this.props.error ? (
      <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      orderSummery = (
        <OrderSummery
          price={this.props.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          ingredients={this.props.ingredients}
        />
      );

      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            onPurchaseInit={this.props.purchaseBurgerInit}
            price={this.props.totalPrice}
            disabledInfo={disabledInfo}
            onAddIngredient={this.props.addIngredient}
            onRemoveIngredient={this.props.removeIngredient}
            isPurchasable={this.isPurchasable(this.props.ingredients)}
            purchaseHandler={this.purchaseHandler}
            isAuth={this.props.isAuth}
            history={this.props.history}
          />
        </>
      );
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

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.ingredients,
  totalPrice: state.ingredients.totalPrice,
  error: state.ingredients.error,
  isAuth: state.auth.token !== null,
});

const mapDispatchToProps = {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseBurgerInit,
};

const withHandler = withErrorHandler(BurgerBuilder, apiBase);

export default connect(mapStateToProps, mapDispatchToProps)(withHandler);
