import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_BURGER_INIT:
      return { ...state, purchased: false };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.payload, loading: false };
    case FETCH_ORDERS_START:
    case PURCHASE_BURGER_START:
      return { ...state, loading: true };
    case PURCHASE_BURGER_SUCCESS:
      const newOrder = { id: action.payload.id, ...action.payload.orderData };
      return { ...state, loading: false, purchased: true, orders: state.orders.concat(newOrder) };
    case PURCHASE_BURGER_FAIL:
    case FETCH_ORDERS_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default orderReducer;
