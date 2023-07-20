import React, { useState } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosStatic } from "axios";
//import Error401RefreshTokenInterceptor from '../../shared/Error401RefreshTokenInterceptor';

// Clear existing interceptors
const clearInterceptors = 
(axiosInstance: AxiosStatic) => 
axiosInstance.interceptors.request.clear();

type LoginProps = {
  children: React.ReactNode; //👈 children prop type
};

/**
 * 
 */
function LogoutNode() {

  console.log("**** Node Log out ****")

  const[loggedIn, setLoggedIn]  = useState(false)
  const[error, setError]        = useState(" ")
  const navigate                = useNavigate();

  localStorage.removeItem("X-ACCESS-TOKEN");
  localStorage.removeItem("X-REFRESH-TOKEN");

  // Clear existing interceptors
  //axios.interceptors.request.eject(Error401RefreshTokenInterceptor);
  axios.interceptors.request.clear();
  axios.interceptors.response.clear();


  return(
    <>
    <div className="App">
      <h3> Bye now!!</h3>
      <hr />
    <nav>
        <ul>
          <li>
            <Link to="/menu">Home</Link>
          </li>
        </ul>
      </nav>
    </div>
    </>
    
  )
}

export default LogoutNode
