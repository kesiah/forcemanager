import React, { Component } from 'react';
import withAuth from '../withAuth';
import AuthHelperMethods from '../AuthHelperMethods';

import './CompanyForm.scss';

class CompanyForm extends Component {
  Auth = new AuthHelperMethods();

  state = {
    companiesType: [],
    name: '',
    salesRepId1: '',
    typeId: '',
    address1: '',
    city: '',
    postcode: '',
    phone: '',
    email: '',
    comment: '',
  }

  componentDidMount() {
    this.Auth.getCompaniesType().then((result) => {
      this.setState({
        companiesType: result,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { item } = nextProps;
    if (item !== this.props.item) {
      const salesRepId1 = (item.salesRepId1) ? item.salesRepId1.id : '';
      const typeId = (item.typeId) ? item.typeId.id : null;

      const name = (item.name) ? item.name : '';
      const address1 = (item.address1) ? item.address1 : '';
      const city = (item.city) ? item.city : '';
      const postcode = (item.postcode) ? item.postcode : '';
      const phone = (item.phone) ? item.phone : '';
      const email = (item.email) ? item.email : '';
      const comment = (item.comment) ? item.comment : '';

      this.setState({
        name,
        salesRepId1,
        typeId,
        address1,
        city,
        postcode,
        phone,
        email,
        comment,
      });
    }
  }

  postDataHandler = (e) => {
    e.preventDefault();

    const {
      name, typeId, address1, city, postcode, phone, email, comment,
    } = this.state;

    const data = {
      name,
      salesRepId1: 103,
      typeId,
      address1,
      city,
      postcode,
      phone,
      email,
      comment,
    };

    this.props.onSubmit(data);
  }

  render() {
    const {
      companiesType, name, salesRepId1, typeId,
      address1, city, postcode, phone, email, comment,
    } = this.state;

    return (
      <form onSubmit={this.postDataHandler}>
        <label htmlFor="name">
          Nombre
          <input
            required
            id="name"
            type="text"
            value={name}
            onChange={event => this.setState({ name: event.target.value })}
          />
        </label>
        <label htmlFor="salesRepId1">
          Responsable
          <input
            required
            id="salesRepId1"
            type="text"
            value={salesRepId1}
            onChange={event => this.setState({ salesRepId1: event.target.value })}
          />
        </label>
        <label htmlFor="typeId">
          Tipo de empresa
          <select
            name="typeId"
            id="typeId"
            onBlur={event => this.setState({ typeId: parseInt(event.target.value, 10) })}
          >
            {companiesType.map(el => (
              <option key={el.id} value={el.id}>{el.descriptionES}</option>
            ))}
          </select>
        </label>
        <label htmlFor="address1">
          Dirección
          <input
            id="address1"
            type="text"
            value={address1}
            onChange={event => this.setState({ address1: event.target.value })}
          />
        </label>
        <label htmlFor="city">
          Ciudad
          <input
            id="city"
            type="text"
            value={city}
            onChange={event => this.setState({ city: event.target.value })}
          />
        </label>
        <label htmlFor="postcode">
          Código postal
          <input
            id="postcode"
            type="text"
            value={postcode}
            onChange={event => this.setState({ postcode: event.target.value })}
          />
        </label>
        <label htmlFor="phone">
          Teléfono
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={event => this.setState({ phone: event.target.value })}
          />
        </label>
        <label htmlFor="email">
          Correo electrónico de la empresa
          <input
            id="email"
            type="email"
            value={email}
            onChange={event => this.setState({ email: event.target.value })}
          />
        </label>
        <label htmlFor="comment">
          Comentarios
          <textarea
            id="comment"
            rows="4"
            value={comment}
            onChange={event => this.setState({ comment: event.target.value })}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default withAuth(CompanyForm);
