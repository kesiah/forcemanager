import React, { Component } from 'react';

import AuthHelperMethods from '../AuthHelperMethods';
import CompanyItem from '../CompanyItem/CompanyItem';

class CompaniesList extends Component {
  Auth = new AuthHelperMethods();

  state = {
    companies: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    this.Auth.fetch('/accounts')
      .then(response => this.setState({ companies: response, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { companies, isLoading, error } = this.state;

    if (error) {
      return <div>Error cargando empresas</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const showResults = (
      companies.map(el => (
        <article key={`${el.id}`}><CompanyItem item={el} /></article>
      ))
    );

    return <div>{showResults}</div>;
  }
}

export default CompaniesList;
