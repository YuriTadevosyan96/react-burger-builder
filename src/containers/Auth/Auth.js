import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { inputConfig } from '../Checkout/ContactData/ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { capitalizeString } from '../../helpers';
import classes from './Auth.module.css';
import { auth } from '../../store/actions/auth';

class Auth extends Component {
  state = {
    authForm: {
      email: inputConfig('input', 'email', 'Your E-Mail'),
      password: inputConfig('input', 'password', 'Your Password'),
    },
    isFormValid: false,
    isSignUp: true,
  };

  submitHandler = (e) => {
    e.preventDefault();
    const authFormCopy = { ...this.state.authForm };
    const formData = {};
    for (let inputKey in authFormCopy) {
      formData[inputKey] = authFormCopy[inputKey].value;
      const inputData = { ...authFormCopy[inputKey] };
      if (inputData.validation) {
        inputData.touched = true;
      }
      authFormCopy[inputKey] = inputData;
    }

    this.setState({ authForm: authFormCopy });

    if (!this.state.isFormValid) {
      return;
    }

    this.props.onAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignUp
    );
  };

  inputChangeHandler = (e) => {
    const { name, value } = e.target;

    const updatedAuthForm = {
      ...this.state.authForm,
      [name]: {
        ...this.state.authForm[name],
        value: value,
        touched: true,
        valid: this.checkValidity(value, this.state.authForm[name].validation),
      },
    };

    let isFormValid = true;
    for (let inputKey in updatedAuthForm) {
      if (!updatedAuthForm[inputKey].valid) {
        isFormValid = false;
        break;
      }
    }

    this.setState({
      authForm: updatedAuthForm,
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

  switchAuthMode = () => {
    this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));
  };

  render() {
    if (this.props.isAuth) {
      if (this.props.burgerSelected) {
        return <Redirect to="/checkout" />;
      }

      return <Redirect to="/" />;
    }

    const renderedInputs = Object.entries(this.state.authForm).map((input) => {
      const [name, config] = input;
      return (
        <Input
          label={capitalizeString(name)}
          elementType={config.elementType}
          elementConfig={config.elementConfig}
          name={name}
          invalid={!config.valid}
          shouldValidate={config.validation && config.touched}
          value={this.state.authForm[name].value}
          onChange={this.inputChangeHandler}
          key={name}
        />
      );
    });

    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <form onSubmit={this.submitHandler}>
          {renderedInputs}
          <Button buttonType="success" disabled={!this.state.isFormValid}>
            SUBMIT
          </Button>
          <Button type="button" buttonType="danger" clicked={this.switchAuthMode}>
            SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
          </Button>
        </form>
      );
    }

    return <div className={classes.Auth}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  let burgerSelected = null;
  if (state.ingredients.ingredients) {
    burgerSelected =
      Object.values(state.ingredients.ingredients).reduce((total, amount) => total + amount, 0) > 0;
  }
  return {
    burgerSelected: burgerSelected,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = { onAuth: auth };

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
