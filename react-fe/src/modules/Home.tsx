import React, { useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import { ApiSimplified } from '../shared/Api';
import { Link, useNavigate } from 'react-router-dom';

function Home() {

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
  const onAuth = () =>{

    ApiSimplified("POST","api/auth", cred)
    .then(res => {
      console.log("document.cookie: " , document.cookie)
      console.log("Auth cookie: " , res.headers['Set-Cookie'])
      console.log("Auth: " , res)
      navigate("/secondPage")
    })
    .catch(err => {
      console.log("AuthErr: " , err.response.data) 
      setError(err.response.data)
    })
  }

  
  const onGreet = () =>{

    ApiSimplified("GET","greeting")
    .then(res => {
      console.log("Greet cookie: " , res.headers["set-cookie"])
      console.log("Greet: " , res)})
    .catch(err =>{
      console.log("foutje: ", err.response.status)
      if(err.response.status == 401) navigate("/login")
    })
  }

  const onGreet2 = () =>{

    ApiSimplified("GET","greeting2")
    .then(res => {
      console.log("Greet2 cookie: " , res.headers)
      console.log("Greet2: " , res)})
  }

  

  return (
    <div className="App">
      
    <h2>Testing Security</h2>
    <button onClick={onGreet} type="button">Greeting</button>
    <button onClick={onGreet2} type="button">Greeting2</button>
    <div>
      <button onClick={onAuth} type="button">Authentication</button>
      <p>{error}</p>
    </div>
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
            <Link to="/logout">Uitlogge...</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
