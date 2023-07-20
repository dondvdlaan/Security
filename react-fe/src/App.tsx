import React from 'react';
import './App.css';
import { ApiNodeSimplified } from './shared/ApiNodeBe';

import { BrowserRouter } from 'react-router-dom';
import Routing from './modules/Routing';
import Login from './modules/authentication/LoginNode';
import LogoutNode from './modules/authentication/LogoutNode';


function App() {

  return (
    <>
      <BrowserRouter>
          <Routing />
      </BrowserRouter>
    </>
  );
}

export default App;
