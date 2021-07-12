import { combineReducers } from 'redux';

import ingredientReducer from './ingredientReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  orders: orderReducer,
});

export default rootReducer;
