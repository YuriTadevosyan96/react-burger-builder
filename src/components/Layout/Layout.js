import React from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  sideDrawerToggleHandler = () => {
    this.setState((state) => ({ showSideDrawer: !state.showSideDrawer }));
  };

  render() {
    return (
      <>
        <Toolbar
          sideDrawerToggle={this.sideDrawerToggleHandler}
          opened={this.sideDrawerOpenHandler}
          isAuth={this.props.isAuth}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuth}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
