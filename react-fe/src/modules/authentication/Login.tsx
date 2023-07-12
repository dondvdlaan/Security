import React, { useState } from 'react';
import '../../App.css';
import { ApiSimplified } from '../../shared/Api';
import { useNavigate } from 'react-router-dom';


/**
 * 
 */
function Login() {

  const[error, setError]  = useState(" ")
  const navigate          = useNavigate();

  const cred = {
    username: "testUser",
    password: "testPW"
  }

  // ---- Event triggers ----
  const onAuth = () =>{

    ApiSimplified("POST","api/auth", cred)
    .then(res => {

      console.log("\n *********** Login **********")
      console.log("document.cookie: " , document.cookie)
      console.log("Auth cookie: " , res.headers['Set-Cookie'])
      console.log("Auth: " , res)
      if(document.cookie) navigate("/home")
    
    })
  }

  return(
    <>
    <div className="App">
      <h2>Login</h2>
      <button onClick={onAuth} type="button">Authentication</button>
      <p>{error}</p>
    </div>
    </>
    
  )
}

export default Login
