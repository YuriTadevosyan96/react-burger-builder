import axios from 'axios';

import { AUTH_FAIL, AUTH_SUCCESS, AUTH_START, AUTH_LOGOUT } from './actionTypes';

const authFail = (error) => ({
  type: AUTH_FAIL,
  payload: error,
});

export const authSuccess = (token, userId) => ({
  type: AUTH_SUCCESS,
  payload: { token, userId },
});

export const logout = () => (dispatch) => {
  _storageClearAuth();
  dispatch({ type: AUTH_LOGOUT });
};

const _storageSetAuth = (interval, token, id) => {
  localStorage.setItem('authTimeout', Date.now() + interval);
  localStorage.setItem('authToken', token);
  localStorage.setItem('userId', id);
};

const _storageClearAuth = () => {
  localStorage.removeItem('authTimeout');
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
};

const checkAuthTimeout = (expireTime) => (dispatch) => {
  setTimeout(() => {
    _storageClearAuth();
    dispatch(logout());
  }, expireTime);
};

const authStart = () => ({
  type: AUTH_START,
});

const _choseUrl = (isSignUp) => {
  const key = 'key=AIzaSyCEpRXhw4r-BZwWI6mZ2kHTATf6w0-pKt4';
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?' + key;
  if (!isSignUp) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?' + key;
  }
  return url;
};

const _authData = (email, password) => ({
  email: email,
  password: password,
  returnSecureToken: true,
});

export const auth = (email, password, isSignUp) => (dispatch) => {
  dispatch(authStart());
  axios
    .post(_choseUrl(isSignUp), _authData(email, password))
    .then((res) => {
      const { idToken, localId } = res.data;
      dispatch(authSuccess(idToken, localId));
      const expireTime = parseInt(res.data.expiresIn) * 1000; // milliseconds
      dispatch(checkAuthTimeout(expireTime));
      _storageSetAuth(expireTime, idToken, localId);
    })
    .catch((err) => {
      dispatch(authFail(err));
    });
};
