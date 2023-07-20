import React from 'react';
import logo from './logo.svg';
import '../App.css';
import { ApiNodeSimplified } from '../shared/ApiNodeBe';
import { Link } from 'react-router-dom';

function SecondPage() {


  // ---- Event triggers ----
  const onRetriecTestData = () =>{

    ApiNodeSimplified("get","api/data")
    .then(res => console.log("Data: " , res))
  }

  
  const onGreet = () =>{

    ApiNodeSimplified("GET","greeting")
    .then(res => console.log("Greet: " , res))
  }

  

  return (
    <div className="App">
      
    <h2>Second Page</h2>
    <button onClick={onGreet} type="button">Greeting</button>
    <button onClick={onRetriecTestData} type="button">Retriev Data</button>
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
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SecondPage;
