import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import apiBase from '../../api/apiBase';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    apiBase
      .get('/orders.json')
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = this.state.orders.map((order) => (
        <Order key={order.id} ingredients={order.ingredients} price={order.price} />
      ));
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, apiBase);
