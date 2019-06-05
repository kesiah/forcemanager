import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import AuthHelperMethods from '../AuthHelperMethods';
import './Login.scss';

class Login extends Component {
  Auth = new AuthHelperMethods();

  state = {
    publicKey: '',
    privateKey: '',
  }

  handleFormSubmit = (data, setSubmitting) => {
    const { publicKey, privateKey } = data;

    this.Auth.getTokenByKeys(publicKey, privateKey)
      .then((res) => {
        if (res === false) {
          return alert("Sorry those credentials don't exist!");
        }
        this.props.history.replace('/');
      })
      .catch((err) => {
        setSubmitting(false);
        alert(err);
      });
  }

  render() {
    if (this.Auth.loggedIn()) {
      return <Redirect to="/" />;
    }

    return (
      <Formik
        initialValues={this.state}
        onSubmit={(values, { setSubmitting }) => {
          this.handleFormSubmit(values, setSubmitting);
        }}
        validationSchema={Yup.object().shape({
          publicKey: Yup.string().required('Campo requerido'),
          privateKey: Yup.string().required('Campo requerido'),
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
          } = props;
          return (
            <form onSubmit={handleSubmit} className="login-form">
              <label htmlFor="publicKey">
                Public Key
                <Field
                  type="text"
                  name="publicKey"
                  value={values.publicKey}
                  className={
                    errors.publicKey && touched.publicKey ? 'text-input error' : 'text-input'
                  }
                />
                {errors.publicKey && touched.publicKey && (
                  <div className="input-feedback">{errors.publicKey}</div>
                )}
              </label>

              <label htmlFor="privateKey">
                Private Key
                <Field
                  type="text"
                  name="privateKey"
                  value={values.privateKey}
                  className={
                    errors.privateKey && touched.privateKey ? 'text-input error' : 'text-input'
                  }
                />
                {errors.privateKey && touched.privateKey && (
                  <div className="input-feedback">{errors.privateKey}</div>
                )}
              </label>
              <button type="submit" disabled={isSubmitting}>
                Get Token
              </button>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default Login;
