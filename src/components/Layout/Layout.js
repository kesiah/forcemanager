import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import CompaniesList from '../CompaniesList/CompaniesList';
import NewCompany from '../NewCompany/NewCompany';
// import EditCompany from '../EditCompany/EditCompany';
import Login from '../Login/Login';

const Layout = () => (
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              exact
              activeClassName="my-active"
              activeStyle={{
                color: '#fa923f',
                textDecoration: 'underline',
              }}
            >
              Listado empresas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new-company"
            >
              Nueva empresa
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <Switch>
      <Route path="/login" component={Login} />
      {/* <Route path="/company/:id" component={EditCompany} /> */}
      <Route path="/new-company" exact component={NewCompany} />
      <Route path="/" exact component={CompaniesList} />
    </Switch>
  </div>
);

export default Layout;
