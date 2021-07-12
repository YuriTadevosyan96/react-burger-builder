import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_INIT,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_START,
  FETCH_ORDERS_FAIL,
} from './actionTypes';
import apiBase from '../../api/apiBase';

const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});

const fetchOrdersStart = () => ({
  type: FETCH_ORDERS_START,
});

const fetchOrdersFail = (error) => ({
  type: FETCH_ORDERS_FAIL,
  payload: error,
});

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchOrdersStart());
  apiBase
    .get('/orders.json')
    .then((res) => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({ ...res.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((err) => {
      dispatch(fetchOrdersFail(err));
    });
};

const purchaseBurgerSuccess = (id, orderData) => ({
  type: PURCHASE_BURGER_SUCCESS,
  payload: { id, orderData },
});

const purchaseBurgerFail = (error) => ({
  type: PURCHASE_BURGER_FAIL,
  payload: error,
});

export const purchaseBurgerInit = () => ({
  type: PURCHASE_BURGER_INIT,
});

const purchaseBurgerStart = () => ({
  type: PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  apiBase
    .post('/orders.json', orderData)
    .then((res) => {
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    })
    .catch((err) => {
      dispatch(purchaseBurgerFail(err));
    });
};
