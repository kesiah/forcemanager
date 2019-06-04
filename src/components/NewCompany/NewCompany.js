import React, { Component } from 'react';
import withAuth from '../withAuth';
import AuthHelperMethods from '../AuthHelperMethods';
import CompanyForm from '../CompanyForm/CompanyForm';

class NewCompany extends Component {
  state = {
    submitted: false,
    error: false,
  }

  postDataHandler = (data) => {
    console.log('[NewCompany] postDataHAndler: ', data);
    const Auth = new AuthHelperMethods();

    Auth.fetch('/accounts', {
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
    // let redirect = null;

    if (error) {
      return <p>Error al crear nueva empresa</p>;
    }

    if (submitted) {
      return <p>Empresa añadida correctamente. En breve redirección</p>;
    }
    return (
      <div>
        <h1>Añadir nueva empresa</h1>
        <CompanyForm onSubmit={this.postDataHandler} />
      </div>
    );
  }
}

export default withAuth(NewCompany);
