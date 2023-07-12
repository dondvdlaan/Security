import React from 'react';
import './App.css';
import { ApiSimplified } from './shared/Api';

import { BrowserRouter } from 'react-router-dom';
import Routing from './modules/Routing';
import Login from './modules/authentication/Login';
import AuthGuard from './modules/authentication/AuthGuard';


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthGuard>
          <Routing />
        </AuthGuard>
      </BrowserRouter>
    </>
  );
}

export default App;
