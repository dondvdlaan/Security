import React, { useState } from 'react';
import '../../App.css';
import { ApiJavaSimplified } from '../../shared/ApiJavaBE';
import { useNavigate } from 'react-router-dom';


/**
 * 
 */
function LoginJava() {

  const[error, setError]  = useState(" ")
  const navigate          = useNavigate();


  // ---- Event triggers ----
  const onAuth = () =>{

    ApiJavaSimplified("GET","javaBE/auth")
    .then(res => {

      console.log("\n *********** Login **********")
      console.log("onJAVAAuth: " , res.data)

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
