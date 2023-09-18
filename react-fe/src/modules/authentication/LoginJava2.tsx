import React, { useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { ApiJava2Simplified } from '../../shared/ApiJava2BE';


/**
 * 
 */
function LoginJava2() {

  const[error, setError]  = useState(" ")
  const navigate          = useNavigate();


  // ---- Event triggers ----
  const onAuth = () =>{

    ApiJava2Simplified("GET","inloggen",{}, true)
    .then(res => {

      console.log("\n *********** Login **********")
      console.log("onJAVA2 auth: " , res)
      
      // Fetch token and refreshtoken and store (ignoring TS null warning)
      // @ts-ignore: Object is possibly 'null'.
      let token: string = res.headers.get("X-ACCESS-TOKEN");
      console.log("onJAVA2 auth token: " , token)
      // @ts-ignore: Object is possibly 'null'.
      let refreshToken: string = res.headers.get("X-REFRESH-TOKEN");
      console.log("onJAVA2 auth refreshToken: " , refreshToken)
      
      if(token) localStorage.setItem("X-ACCESS-TOKEN", token)
      if(refreshToken) localStorage.setItem("X-REFRESH-TOKEN", refreshToken)

      if(res.data) navigate("/testJava2")
    
    }) 
    .catch(err => console.log("Login err", err))
  }
  const onTest = () =>{

    ApiJava2Simplified("GET","test")
    .then(res => {

      console.log("\n *********** Login **********")
      console.log("onJAVA2 test: " , res.data)

      if(res.data) navigate("/testJava2")
    
    })
    .catch(err => console.log("Login err", err))
  }

  return(
    <>
    <div className="App">
      <h2>Login Java2</h2>
      <p>JWT authentication</p>
      <button onClick={onAuth} type="button">Authentication</button>
      <button onClick={onTest} type="button">Test</button>
      <p>{error}</p>
    </div>
    </>
    
  )
}

export default LoginJava2
