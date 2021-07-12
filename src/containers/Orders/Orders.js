import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import apiBase from '../../api/apiBase';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/order';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order key={order.id} ingredients={order.ingredients} price={order.price} />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  loading: state.orders.loading,
});

const mapDispatchToProps = { fetchOrders };

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, apiBase));
