import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Logout.module.css';
import Button from '../../../components/UI/Button/Button';
import { logout } from '../../../store/actions/auth';

class Logout extends Component {
  state = {
    cancelLogout: false,
  };

  onLogoutCancel = () => {
    this.setState({ cancelLogout: true });
  };

  render() {
    let renderContent = (
      <div className={classes.Logout}>
        <div>Are you sure?</div>
        <Button clicked={this.onLogoutCancel} buttonType="danger">
          Cancel
        </Button>
        <Button clicked={this.props.logout} buttonType="success">
          Log Out
        </Button>
      </div>
    );

    if (this.state.cancelLogout || !this.props.isAuth) {
      renderContent = <Redirect to="/" />;
    }

    return renderContent;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
