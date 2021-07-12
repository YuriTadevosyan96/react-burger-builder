import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import apiBase from '../../../api/apiBase';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import { capitalizeString } from '../../../helpers';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/order';

// helper
const inputConfig = (elType, elConfigType, elPlaceholder, required = true, value = '') => ({
  elementType: elType,
  elementConfig: {
    type: elConfigType,
    placeholder: elPlaceholder,
  },
  validation: {
    required: required,
  },
  valid: false,
  touched: false,
  value: value,
});

class ContactData extends Component {
  state = {
    orderForm: {
      name: inputConfig('input', 'text', 'Your Name'),
      street: inputConfig('input', 'text', 'Street'),
      zipCode: inputConfig('input', 'text', 'ZIP Code'),
      country: inputConfig('input', 'text', 'Country'),
      email: inputConfig('input', 'email', 'Your E-Mail'),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        validation: {},
        valid: true,
        touched: true,
        value: 'fastest',
      },
    },
    isFormValid: false,
  };

  submitHandler = (e) => {
    e.preventDefault();
    const orderFormCopy = { ...this.state.orderForm };
    const formData = {};
    for (let inputKey in orderFormCopy) {
      formData[inputKey] = orderFormCopy[inputKey].value;
      const inputData = { ...orderFormCopy[inputKey] };
      if (inputData.validation) {
        inputData.touched = true;
      }
      orderFormCopy[inputKey] = inputData;
    }

    this.setState({ orderForm: orderFormCopy });

    if (!this.state.isFormValid) {
      return;
    }

    const order = {
      orderData: formData,
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
    };

    this.props.purchaseBurger(order);
  };

  inputChangeHandler = (e) => {
    const { name, value } = e.target;

    const updatedOrderForm = {
      ...this.state.orderForm,
      [name]: {
        ...this.state.orderForm[name],
        value: value,
        touched: true,
        valid: this.checkValidity(value, this.state.orderForm[name].validation),
      },
    };

    let isFormValid = true;
    for (let inputKey in updatedOrderForm) {
      if (!updatedOrderForm[inputKey].valid) {
        isFormValid = false;
        break;
      }
    }

    this.setState({
      orderForm: updatedOrderForm,
      isFormValid: isFormValid,
    });
  };

  checkValidity = (value, rules) => {
    if (!rules) return true;

    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    return isValid;
  };

  render() {
    const renderedInputs = Object.entries(this.state.orderForm).map((input) => {
      const [name, config] = input;
      return (
        <Input
          label={capitalizeString(name)}
          elementType={config.elementType}
          elementConfig={config.elementConfig}
          name={name}
          invalid={!config.valid}
          shouldValidate={config.validation && config.touched}
          value={this.state.orderForm[name].value}
          onChange={this.inputChangeHandler}
          key={name}
        />
      );
    });

    let form = (
      <form onSubmit={this.submitHandler}>
        {renderedInputs}
        <Button disabled={!this.state.isFormValid} buttonType="success">
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients.ingredients,
  totalPrice: state.ingredients.totalPrice,
  loading: state.orders.loading,
});

const mapDispatchToProps = { purchaseBurger };

const withHandler = withErrorHandler(ContactData, apiBase);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withHandler));
