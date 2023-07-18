import React, { useEffect, useState } from 'react';
import '../../App.css';
import { ApiSimplified } from '../../shared/Api';
import { Link, useNavigate } from 'react-router-dom';
import Login from './LoginNode';


type LoginProps = {
  children: React.ReactNode; //👈 children prop type
};

/**
 * 
 */
function LogoutNode() {

  const[loggedIn, setLoggedIn]  = useState(false)
  const[error, setError]        = useState(" ")
  const navigate                = useNavigate();

  localStorage.removeItem("X-ACCESS-TOKEN");
  localStorage.removeItem("X-REFRESH-TOKEN");


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
