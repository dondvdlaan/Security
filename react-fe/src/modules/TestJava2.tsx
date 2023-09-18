import { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { ApiJava2Simplified } from '../shared/ApiJava2BE';

function TestJava2() {

  const[error, setError] = useState(" ")
  const[message, setMessage] = useState(" ")
  const navigate = useNavigate();


  // ---- Event triggers ----
  
  const onTest = () =>{

    ApiJava2Simplified("GET", "test")
    .then(res => {
      console.log("onTest: " , res.data)
      setError(" ")
      setMessage(res.data)
    })
    .catch(err =>{
      console.log("Test foutief: ", err.response.status)
      setMessage(" ")
      setError(err.response.status)
      //if(err.response.status == 401) navigate("/loginJava")
    })
  }


  return (
    <div className="App">
      
    <h2>JAVA2 Testing Security</h2>
    <button onClick={onTest} type="button">Test</button>
    <div>{message}</div>
    <div>{error}</div>
    <hr></hr>

    <h3>Links Java2</h3>
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secondPage">Next Page</Link>
          </li>
          <li>
            <Link to="/logout">Uitloggen</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TestJava2;
