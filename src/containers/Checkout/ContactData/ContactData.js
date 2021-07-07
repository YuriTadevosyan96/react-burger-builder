import React, { Component } from 'react';

import apiBase from '../../../api/apiBase';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'John Doe',
        address: {
          street: 'test street',
          zipCode: '44563',
          country: 'Russia',
        },
        email: 'test@gmail.com',
      },
      deliveryMethod: 'fastest',
    };
    apiBase
      .post('/orders.json', order)
      .then((res) => {
        this.props.history.push('/');
      })
      .catch((err) => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form onSubmit={this.handleSubmit}>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code" />
        <Button clicked={this.orderHandler} buttonType="success">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
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
