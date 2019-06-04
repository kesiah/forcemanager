import React, { Component } from 'react';
import AuthHelperMethods from './AuthHelperMethods';

/* A higher order component is frequently written as a function that returns a class. */
export default function withAuth(AuthComponent) {
  const Auth = new AuthHelperMethods();

  return class AuthWrapped extends Component {
    state = {
      confirm: null,
      loaded: false,
    };

    // Verify the current authentication status before enter into the app.
    componentDidMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace("/login");
      } else {
        // Try to get confirmation message from the Auth helper.
        try {
          const confirm = Auth.getConfirm();
          console.log('confirmation is:', confirm);
          this.setState({
            confirm,
            loaded: true,
          });
        } catch (err) {
          // Error! Print it and logout for security reasons.
          console.log(err);
          Auth.logout();
          this.props.history.replace("/login");
        }
      }
    }

    render() {
      const { loaded, confirm } = this.state;
      if (loaded === true) {
        if (confirm) {
          console.log('confirmed!', this.props);
          return (
            // component that is currently being wrapper
            <AuthComponent
              history={this.props.history}
              match={this.props.match}
              location={this.props.location}
              confirm={confirm}
              {...this.props}
            />
          );
        }

        console.log('not confirmed!');
        return null;
      }

      return null;
    }
  };
}
