import React, { useState } from 'react';
import '../../App.css';
import { ApiJakartaSimplified } from '../../shared/ApiJakartaBE';
import { useNavigate } from 'react-router-dom';


/**
 * 
 */
function LoginJakarta() {

  const[error, setError]  = useState(" ")
  const navigate          = useNavigate();


  // ---- Event triggers ----
  const onAuth = () =>{

    ApiJakartaSimplified("GET","auth")
    .then(res => {

      console.log("\n *********** Login **********")
      console.log("onJAKARTA auth: " , res.data)

      if(res.data) navigate("/testJakarta")
    
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

export default LoginJakarta
