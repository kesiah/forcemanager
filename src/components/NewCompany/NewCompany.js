import React, { Component } from 'react';

import withAuth from '../withAuth';
import AuthHelperMethods from '../AuthHelperMethods';
import CompanyForm from '../CompanyForm/CompanyForm';

class NewCompany extends Component {
  Auth = new AuthHelperMethods();

  state = {
    submitted: false,
    error: false,
  }

  postDataHandler = (data) => {
    this.Auth.fetch('/accounts', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(() => {
      // redirect to list of companies
      this.setState({ submitted: true });

      setTimeout(() => {
        this.props.history.replace('/');
      }, 1000);
    }).catch(() => {
      this.setState({
        error: true,
      });
    });
  }

  render() {
    const {
      submitted,
      error,
    } = this.state;

    if (error) {
      return <div className="error-message">Error al crear nueva empresa</div>;
    }

    if (submitted) {
      return <div className="success-message">Empresa añadida correctamente.</div>;
    }

    return (
      <div>
        <h1 className="title">Añadir nueva empresa</h1>
        <CompanyForm onSubmit={this.postDataHandler} />
      </div>
    );
  }
}

export default withAuth(NewCompany);
