import React, { Component } from 'react';
import withAuth from '../withAuth';
import AuthHelperMethods from '../AuthHelperMethods';

import './NewCompany.scss';

class NewCompany extends Component {
  state = {
    companiesType: [],
    submitted: false,
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
    console.log(this.props);
    const Auth = new AuthHelperMethods();

    Auth.getCompaniesType().then((result) => {
      console.log("REsult getCompaniesTypeList", result);
      this.setState({
        companiesType: result,
      });
    });
  }

  postDataHandler = (e) => {
    e.preventDefault();

    const {
      name, salesRepId1, typeId, address1, city, postcode, phone, email, comment,
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

    console.log('postDataHAndler: ', data);
    const Auth = new AuthHelperMethods();

    Auth.fetch('/accounts', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Result adding new company", res);
      console.log(this.props);
      // redirect to list of companies
      this.setState({ submitted: true });

      setTimeout(() => {
        this.props.history.replace('/');
      }, 1000);
    });
  }

  render() {
    const {
      companiesType, submitted, name, salesRepId1, typeId,
      address1, city, postcode, phone, email, comment,
    } = this.state;
    // let redirect = null;
    if (submitted) {
      console.log("submit");
      // redirect = <Redirect to="/" />;
      return <p>Empresa añadida correctamente. En breve redirección</p>;
    }
    return (
      <div className="NewCompany">
        {/* {redirect} */}
        <h1>Añadir nueva empresa</h1>
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
      </div>
    );
  }
}

export default withAuth(NewCompany);
