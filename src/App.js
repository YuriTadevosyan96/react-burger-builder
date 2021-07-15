import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authSuccess, logout } from './store/actions/auth';

function App() {
  const dispatch = useDispatch();

  const getStorageAuth = () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    return { token, userId };
  };

  const checkAuthTiming = () => {
    const logoutTime = localStorage.getItem('authTimeout');
    if (!logoutTime) {
      return;
    }

    const interval = logoutTime - Date.now();
    return interval > 0;
  };

  useEffect(() => {
    const checkAuth = () => {
      if (!checkAuthTiming()) {
        dispatch(logout());
        return;
      }

      const { token, userId } = getStorageAuth();
      dispatch(authSuccess(token, userId));
    };

    checkAuth();
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
