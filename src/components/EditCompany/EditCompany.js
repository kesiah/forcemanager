import React, { Component } from 'react';
import withAuth from '../withAuth';
import AuthHelperMethods from '../AuthHelperMethods';

import CompanyForm from '../CompanyForm/CompanyForm';

class EditCompany extends Component {
  state = {
    submitted: false,
    error: false,
    item: {},
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    const Auth = new AuthHelperMethods();

    Auth.fetch(`/accounts/${id}`).then((result) => {
      console.log("Result get company by id", id, result);
      this.setState({ item: result, submitted: false });
    });
  }

  postDataHandler = (data) => {
    const { id } = this.props.match.params;
    console.log('[EditCompany] postDataHAndler ID: ', id, data);
    const Auth = new AuthHelperMethods();

    Auth.fetch(`/accounts/${id}`, {
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
      return <p>Error al guardar los datos</p>;
    }

    if (submitted) {
      return <p>Empresa editada correctamente. En breve redirección</p>;
    }

    return (
      <div>
        <h1>Editar empresa</h1>
        <CompanyForm onSubmit={this.postDataHandler} item={this.state.item} />
      </div>
    );
  }
}

// export default EditCompany;
export default withAuth(EditCompany);
