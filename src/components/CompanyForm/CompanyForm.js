import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import withAuth from '../withAuth';
import AuthHelperMethods from '../AuthHelperMethods';

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

  postDataHandler = (values, setSubmitting) => {
    const {
      name, typeId, address1, city, postcode, phone, email, comment,
    } = values;

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
    setSubmitting(false);
  }

  render() {
    return (
      <Formik
        initialValues={this.state}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          this.postDataHandler(values, setSubmitting);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Campo requerido'),
          salesRepId1: Yup.string().required('Campo requerido'),
          address1: Yup.string(),
          city: Yup.string(),
          postcode: Yup.string().matches(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/, 'Añade un código postal correcto'),
          phone: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Introduce un teléfono correcto'),
          email: Yup.string().email('Introduce un correo electrónico correcto'),
          comment: Yup.string().max(250, 'Carácterres máximos superados'),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">
                Nombre
                <Field
                  type="text"
                  name="name"
                  value={values.name}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </label>
              <label htmlFor="salesRepId1">
                Responsable
                <Field
                  type="text"
                  name="salesRepId1"
                  className={
                    errors.salesRepId1 && touched.salesRepId1 ? 'text-input error' : 'text-input'
                  }
                />
                {errors.salesRepId1 && touched.salesRepId1 && (
                  <div className="input-feedback">{errors.salesRepId1}</div>
                )}
              </label>
              <label htmlFor="typeId">
                Tipo de empresa
                <Field
                  component="select"
                  name="typeId"
                  onBlur={event => setFieldValue('typeId', parseInt(event.target.value, 10))}
                >
                  {values.companiesType.map(el => (
                    <option key={el.id} value={el.id}>{el.descriptionES}</option>
                  ))}
                </Field>
              </label>
              <label htmlFor="address1">
                Dirección
                <Field
                  type="text"
                  name="address1"
                  className={
                    errors.address1 && touched.address1 ? 'text-input error' : 'text-input'
                  }
                />
                {errors.address1 && touched.address1 && (
                  <div className="input-feedback">{errors.address1}</div>
                )}
              </label>
              <label htmlFor="city">
                Ciudad
                <Field
                  type="text"
                  name="city"
                  className={
                    errors.city && touched.city ? 'text-input error' : 'text-input'
                  }
                />
                {errors.city && touched.city && (
                  <div className="input-feedback">{errors.city}</div>
                )}
              </label>
              <label htmlFor="postcode">
                Código postal
                <Field
                  type="text"
                  name="postcode"
                  className={
                    errors.postcode && touched.postcode ? 'text-input error' : 'text-input'
                  }
                />
                {errors.postcode && touched.postcode && (
                  <div className="input-feedback">{errors.postcode}</div>
                )}
              </label>
              <label htmlFor="phone">
                Teléfono
                <Field
                  type="tel"
                  name="phone"
                  className={
                    errors.phone && touched.phone ? 'text-input error' : 'text-input'
                  }
                />
                {errors.phone && touched.phone && (
                  <div className="input-feedback">{errors.phone}</div>
                )}
              </label>
              <label htmlFor="email">
                Correo electrónico de la empresa
                <Field
                  type="email"
                  name="email"
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </label>
              <label htmlFor="comment">
                Comentarios
                <Field
                  name="comment"
                  component="textarea"
                  rows="4"
                  className={
                    errors.comment && touched.comment ? 'text-input error' : 'text-input'
                  }
                />
                {errors.comment && touched.comment && (
                  <div className="input-feedback">{errors.comment}</div>
                )}
              </label>
              <button type="submit" disabled={isSubmitting}>
                Enviar
              </button>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default withAuth(CompanyForm);
