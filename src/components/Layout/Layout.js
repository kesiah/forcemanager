import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import CompaniesList from '../CompaniesList/CompaniesList';
import NewCompany from '../NewCompany/NewCompany';
import EditCompany from '../EditCompany/EditCompany';
import Login from '../Login/Login';

import './Layout.scss';

const Layout = () => (
  <div>
    <header id="header">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              exact
              activeClassName="active"
            >
              Listado empresas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new-company"
              exact
              activeClassName="active"
            >
              Nueva empresa
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <section id="main">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/company/:id" component={EditCompany} />
        <Route path="/new-company" exact component={NewCompany} />
        <Route path="/" exact component={CompaniesList} />
      </Switch>
    </section>
  </div>
);

export default Layout;
