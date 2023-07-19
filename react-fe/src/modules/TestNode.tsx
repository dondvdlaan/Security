import React, { useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import { ApiSimplified } from '../shared/Api';
import { Link, useNavigate } from 'react-router-dom';
import { JWT } from '../Types/JWT';
import { AxiosResponse } from 'axios';

function TestNode() {

  const[error, setError] = useState(" ")
  const navigate = useNavigate();

  let today = new Date(Date.now() + 86400e3).toUTCString();

  //document.cookie = `'app = ikke'; expires = ${today}; path=/; domain=localhost`;

  //console.log("cookie: ", document.cookie);

  const cred = {
    username: "testUser",
    password: "testPW"
  }

  // ---- Event triggers ----
  
  const onGreet = () =>{

    ApiSimplified(4500, "GET","greeting")
    .then(res => {
      console.log("Greet cookie: " , res.headers["set-cookie"])
      console.log("Greet: " , res)})
    .catch(err =>{
      console.log("foutje: ", err.response.status)
      if(err.response.status == 401) navigate("/loginNode")
    })
  }
  const getCSRF = () =>{

    ApiSimplified(4500, "GET","csrf-token")
    .then(res => {
      console.log("getCSRF: " , res.data.token)
    let csrfToken = res.data.token;
    localStorage.setItem("x-csrf-test", csrfToken);
    })
    .catch(err =>{
      console.log("foutje: ", err.response.status)
      //if(err.response.status == 401) navigate("/login")
    })
  }

  const onCSRF = () =>{

    ApiSimplified(4500, "POST","addUser", )
    .then(res => {
      console.log("onCSRF: " , res)})
  }

 

  return (
    <div className="App">
      
    <h2>Testing Security</h2>
    <button onClick={onGreet} type="button">Greeting</button>
    <button onClick={getCSRF} type="button">get CSRF Token</button>
    <button onClick={onCSRF} type="button">POST add names</button>
    <hr></hr>

    <h3>Links</h3>
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secondPage">Next Page</Link>
          </li>
          <li>
            <Link to="/logoutNode">Uitlogge...</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TestNode;
