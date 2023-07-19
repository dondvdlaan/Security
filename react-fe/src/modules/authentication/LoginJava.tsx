import React, { useState } from 'react';
import '../../App.css';
import { ApiSimplified } from '../../shared/Api';
import { useNavigate } from 'react-router-dom';


/**
 * 
 */
function LoginJava() {

  const[error, setError]  = useState(" ")
  const navigate          = useNavigate();

  const cred = {
    username: "testUserJava",
    password: "testPWJava"
  }

  // ---- Event triggers ----
  const onAuth = () =>{

    ApiSimplified(8080,"GET","javaBE/auth")
    .then(res => {

      let accessToken = null
      let refreshToken = null

      console.log("\n *********** Login **********")
      console.log("onJAVAAuth: " , res.data)

      accessToken = res.data.jwtAccess
      refreshToken = res.data.jwtSecret

      //localStorage.setItem("X-ACCESS-TOKEN", accessToken);
      //localStorage.setItem("X-REFRESH-TOKEN",refreshToken);

      if(res.data) navigate("/testJava")
    
    })
    .catch(err => console.log("Login err", err))
  }

  return(
    <>
    <div className="App">
      <h2>Login Java</h2>
      <p>Basic Auth user/password</p>
      <button onClick={onAuth} type="button">Authentication</button>
      <p>{error}</p>
    </div>
    </>
    
  )
}

export default LoginJava
