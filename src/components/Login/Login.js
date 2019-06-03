import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AuthHelperMethods from '../AuthHelperMethods';

class Login extends Component {
  Auth = new AuthHelperMethods();

  state = {
    publicKey: 'd61f7d2efc47f2c31ddec8fd1e4e512a0f1fe',
    privateKey: '2ec6347d6c9ea6a8468cbfd2d9f1574abb85ee60874828ad66b24490a8e2219d4c553e7d1ddc6',
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
    );
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { publicKey, privateKey } = this.state;

    this.Auth.getTokenByKeys(publicKey, privateKey)
      .then((res) => {
        if (res === false) {
          return alert("Sorry those credentials don't exist!");
        }
        this.props.history.replace("/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    const { publicKey, privateKey } = this.state;

    if (this.Auth.loggedIn()) {
      return <Redirect to="/" />;
    }

    return (
      <form>
        <input
          placeholder="Public Key"
          name="publicKey"
          type="text"
          value={publicKey}
          onChange={this.handleChange}
        />
        <input
          placeholder="Private key"
          name="privateKey"
          type="text"
          value={privateKey}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleFormSubmit}>Get Token</button>
      </form>
    );
  }
}

export default Login;
