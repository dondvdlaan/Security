import React, { useState } from 'react';
import '../../App.css';
import { ApiSimplified } from '../../shared/Api';
import { Link, useNavigate } from 'react-router-dom';


/**
 * 
 */
function Logout() {

  function deleteCookies() {

    var allCookies = document.cookie.split(';');
    
    // The "expire" attribute of every cookie is 
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
        document.cookie = allCookies[i] + "=;expires="
        + new Date(0).toUTCString();


}

  deleteCookies()

  localStorage.removeItem("X-ACCESS-TOKEN");
      localStorage.removeItem("X-REFRESH-TOKEN");

  return(
    <>
    <div className="App">
      <h2>Bye now!!</h2>
      <hr />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
         {/* <li>
            <Link to="/secondPage">Next Page</Link>
          </li>
          <li>
            <Link to="/logout">Uitlogge...</Link>
          </li>*/}
        </ul>
      </nav>
    </div>
    </>
    
  )
}

export default Logout
