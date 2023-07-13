import React, { useEffect, useState } from 'react';
import '../../App.css';
import { ApiSimplified } from '../../shared/Api';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

function getCookie(cname: string) {

  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
type LoginProps = {
  children: React.ReactNode; //👈 children prop type
};

/**
 * 
 */
function AuthGuard(props: LoginProps ) {

  const[loggedIn, setLoggedIn]  = useState(false)
  const[error, setError]        = useState(" ")
  const navigate                = useNavigate();

  console.log("AuthGuard document.cookie: " , document.cookie)
  

  useEffect(() => {

    if(document.cookie){
      let jwtAccess = getCookie('JWT_ACCESS');
      localStorage.setItem("X-ACCESS-TOKEN", jwtAccess);
      
      //let csrfToken = getCookie('XSRF-TOKEN');
      //localStorage.setItem("XSRF-TOKEN", csrfToken);

      setLoggedIn(true);
    } 
  },[document.cookie])

  return(
    <>
    <div className="App">
    </div>
    {loggedIn ? props.children : <Login />}  {/*👈 Access children */}
    </>
    
  )
}

export default AuthGuard
