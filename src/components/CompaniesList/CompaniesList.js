import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import AuthHelperMethods from '../AuthHelperMethods';
import CompanyItem from '../CompanyItem/CompanyItem';
import withAuth from '../withAuth';

class CompaniesList extends Component {
  Auth = new AuthHelperMethods();

  state = {
    companies: [],
    isLoading: false,
    error: null,
    openModal: false,
    currentDeleteId: null,
    errorDeleting: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    this.Auth.fetch('/accounts')
      .then(response => this.setState({ companies: response, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  openDeleteModal = (id) => {
    this.setState({ openModal: true, currentDeleteId: id });
  };

  confirmDeleteCompany = () => {
    const { currentDeleteId } = this.state;

    this.Auth.fetch(`/accounts/${currentDeleteId}`, { method: 'DELETE' })
      .then(() => {
        // remove from list
        const filteredArray = this.state.companies.filter(
          el => el.id !== this.state.currentDeleteId);

        this.setState({
          companies: filteredArray,
        });

        this.onCloseModal();
      })
      .catch(error => this.setState({ errorDeleting: error }));
  };

  onCloseModal = () => {
    this.setState({ openModal: false, currentDeleteId: null, errorDeleting: null });
  };

  render() {
    const {
      companies, isLoading, error, errorDeleting,
    } = this.state;

    let modalHtml = (
      <React.Fragment>
        <h4>¿Realmente quieres eliminar esta empresa?</h4>
        <button type="button" onClick={this.confirmDeleteCompany}>Aceptar</button>
        <button type="button" onClick={this.onCloseModal}>Cancelar</button>
      </React.Fragment>
    );

    if (error) {
      return <div className="error-message">Error cargando empresas</div>;
    }

    if (errorDeleting) {
      modalHtml = <div className="error-message">Error borrando empresa</div>;
    }

    if (isLoading) {
      return <div className="loading" />;
    }

    const showResults = (
      companies.map(el => (
        <React.Fragment key={`${el.id}`}><CompanyItem item={el} handleDelete={this.openDeleteModal} /></React.Fragment>
      ))
    );

    const { openModal } = this.state;
    return (
      <div>
        <h1 className="title">Listado de empresas</h1>
        {showResults}
        <Modal open={openModal} onClose={this.onCloseModal} center>
          {modalHtml}
        </Modal>
      </div>
    );
  }
}

export default withAuth(CompaniesList);
