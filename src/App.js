import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
