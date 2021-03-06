import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGOUT:
      return { ...state, token: null, userId: null };
    case AUTH_START:
      return { ...state, error: null, loading: true };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case AUTH_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default authReducer;
