import React from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
      };

      this.requestInterceptor = axios.interceptors.request.use((config) => {
        this.setState({ error: null });
        return config;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          {
            <Modal modalClosed={this.errorConfirmedHandler} show={this.state.error}>
              {this.state.error ? this.state.error.message : null}
            </Modal>
          }
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
