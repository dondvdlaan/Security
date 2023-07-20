import React, { useState } from 'react';
import '../../App.css';
import { ApiNodeSimplified } from '../../shared/ApiNodeBe';
import { useNavigate } from 'react-router-dom';


/**
 * 
 */
function LoginNode() {

  const[error, setError]  = useState(" ")
  const navigate          = useNavigate();

  const cred = {
    username: "testUser",
    password: "testPW"
  }

  // ---- Event triggers ----
  const onAuth = () =>{

    ApiNodeSimplified("POST","api/auth", cred)
    .then((res: any) => {

      let accessToken = null
      let refreshToken = null

      console.log("\n *********** Login **********")
      console.log("onAuth: " , res.data)

      accessToken = res.data.jwtAccess
      refreshToken = res.data.jwtSecret

      localStorage.setItem("X-ACCESS-TOKEN", accessToken);
      localStorage.setItem("X-REFRESH-TOKEN",refreshToken);

      if(res.data) navigate("/testNode")
    
    })
    .catch(err => console.log("Login err", err))
  }

  return(
    <>
    <div className="App">
      <h2>Login Node</h2>
      <button onClick={onAuth} type="button">Authentication</button>
      <p>{error}</p>
    </div>
    </>
    
  )
}

export default LoginNode
