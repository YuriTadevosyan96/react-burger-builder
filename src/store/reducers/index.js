import { combineReducers } from 'redux';

import ingredientReducer from './ingredientReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  orders: orderReducer,
  auth: authReducer,
});

export default rootReducer;
