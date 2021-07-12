import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from '../actions/actionTypes';
import { roundNthDecimalPlaces } from '../../helpers';

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 1,
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.6,
  cheese: 0.4,
  meat: 0.5,
};

const addOrRemoveIngredient = (state, ingName, add) => {
  const totalPrice = add
    ? state.totalPrice + INGREDIENT_PRICES[ingName]
    : state.totalPrice - INGREDIENT_PRICES[ingName];
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingName]: add ? state.ingredients[ingName] + 1 : state.ingredients[ingName] - 1,
    },
    totalPrice: roundNthDecimalPlaces(totalPrice, 2),
  };
};

const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, ingredients: action.payload, error: false, totalPrice: 1 };
    case FETCH_INGREDIENTS_FAILED:
      return { ...state, ingredients: null, error: true };
    case ADD_INGREDIENT:
      return addOrRemoveIngredient(state, action.payload, true);
    case REMOVE_INGREDIENT:
      if (state.ingredients[action.payload] < 1) {
        return state;
      }
      return addOrRemoveIngredient(state, action.payload, false);
    default:
      return state;
  }
};

export default ingredientReducer;
