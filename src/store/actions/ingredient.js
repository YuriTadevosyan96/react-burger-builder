import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from './actionTypes';
import apiBase from '../../api/apiBase';

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
});

export const removeIngredient = (ingredient) => ({
  type: REMOVE_INGREDIENT,
  payload: ingredient,
});

const setIngredients = (ingredients) => ({
  type: SET_INGREDIENTS,
  payload: ingredients,
});

const fetchIngredientsFailed = () => ({
  type: FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => (dispatch) => {
  apiBase
    .get('/ingredients.json')
    .then((res) => {
      dispatch(setIngredients(res.data));
    })
    .catch((err) => {
      dispatch(fetchIngredientsFailed());
    });
};
