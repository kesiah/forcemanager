import React, { Component } from 'react';
import withAuth from '../withAuth';
import AuthHelperMethods from '../AuthHelperMethods';

import CompanyForm from '../CompanyForm/CompanyForm';

class EditCompany extends Component {
  Auth = new AuthHelperMethods();

  state = {
    submitted: false,
    error: false,
    item: {},
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.Auth.fetch(`/accounts/${id}`).then((result) => {
      this.setState({ item: result, submitted: false });
    });
  }

  postDataHandler = (data) => {
    const { id } = this.props.match.params;

    this.Auth.fetch(`/accounts/${id}`, {
      method: 'PUT',
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
      return <div className="error-message">Error al guardar los datos</div>;
    }

    if (submitted) {
      return <div className="success-message">Empresa editada correctamente.</div>;
    }

    return (
      <div>
        <h1 className="title">Editar empresa</h1>
        <CompanyForm onSubmit={this.postDataHandler} item={this.state.item} />
      </div>
    );
  }
}

// export default EditCompany;
export default withAuth(EditCompany);
