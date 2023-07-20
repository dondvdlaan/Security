import React, { useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import { ApiNodeSimplified } from '../shared/ApiNodeBe';
import { Link, useNavigate } from 'react-router-dom';
import { JWT } from '../Types/JWT';
import { AxiosResponse } from 'axios';

function Menu() {

 
  return (
    <div className="App">
      
    <h2>Menu</h2>
    <nav>
        <ul>
          <li>
            <Link to="/loginNode">Node</Link>
          </li>
          <li>
            <Link to="/loginJava">Java</Link>
          </li>
          <li>
            <Link to="/logout">Uitlogge...</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
