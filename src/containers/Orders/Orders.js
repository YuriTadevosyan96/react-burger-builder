import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import apiBase from '../../api/apiBase';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/order';

class Orders extends Component {
  componentDidMount() {
    if (this.props.token) {
      this.props.fetchOrders(this.props.token, this.props.userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.props.fetchOrders(this.props.token, this.props.userId);
    }
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
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = { fetchOrders };

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, apiBase));
