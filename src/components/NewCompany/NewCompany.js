import React, { Component } from 'react';
// import axios from 'axios';
import { Redirect } from 'react-router-dom';
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

    Auth.getCompaniesType().then((res) => {
      console.log("REsult getCompaniesTypeList", res);
      this.setState({
        companiesType: res
      });
    });
  }

  postDataHandler = () => {
    const data = {
      name: this.state.name,
      salesRepId1: this.state.salesRepId1,
      typeId: this.state.typeId,
      address1: this.state.address1,
      city: this.state.city,
      postcode: this.state.postcode,
      phone: this.state.phone,
      email: this.state.email,
      comment: this.state.comment,
    };

    console.log('postDataHAndler: ', data);
    // axios.post('/posts', data)
    //   .then(response => {
    //     console.log(response);
    //     this.props.history.replace('/posts');
    //     // this.setState( { submitted: true } );
    //   });
  }

  render() {
    // let redirect = null;
    // if (this.state.submitted) {
    //   redirect = <Redirect to="/posts" />;
    // }
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
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </label>
          <label htmlFor="salesRepId1">
            Responsable
          <input
              required
              id="salesRepId1"
              type="text"
              value={this.state.salesRepId1}
              onChange={event => this.setState({ salesRepId1: event.target.value })}
            />
          </label>
          <label htmlFor="typeId">
            Tipo de empresa
          <input
              required
              id="typeId"
              type="text"
              value={this.state.typeId}
              onChange={event => this.setState({ typeId: event.target.value })}
            />
          </label>
          <label htmlFor="address1">
            Dirección
          <input
              id="address1"
              type="text"
              value={this.state.address1}
              onChange={event => this.setState({ address1: event.target.value })}
            />
          </label>
          <label htmlFor="city">
            Ciudad
          <input
              id="city"
              type="text"
              value={this.state.city}
              onChange={event => this.setState({ city: event.target.value })}
            />
          </label>
          <label htmlFor="postcode">
            Código postal
          <input
              id="postcode"
              type="text"
              value={this.state.postcode}
              onChange={event => this.setState({ postcode: event.target.value })}
            />
          </label>
          <label htmlFor="phone">
            Teléfono
          <input
              id="phone"
              type="text"
              value={this.state.phone}
              onChange={event => this.setState({ phone: event.target.value })}
            />
          </label>
          <label htmlFor="email">
            Correo electrónico de la empresa
          <input
              id="email"
              type="email"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </label>
          <label htmlFor="comment">
            Comentarios
          <textarea
              id="comment"
              rows="4"
              value={this.state.comment}
              onChange={(event) => this.setState({ comment: event.target.value })} />
          </label>
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}

export default withAuth(NewCompany);
