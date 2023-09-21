import React, { useState } from 'react';
import './App.css';
import { CheckBox } from 'grommet';
import axios from 'axios';

function App() {

  const [checked, setChecked] = useState(false)
  const [checked2, setChecked2] = useState(false)
 
  // ---- Events ----
  const onTest1 = (event:  React.ChangeEvent<HTMLInputElement>) =>{
 
   setChecked(event.target.checked)
 
   const config={
     method: "GET",
     url: 'http://localhost:8080/',
     withCredentials: true
   }
   console.log("axios config: ", config)
 
   axios(config)
   .then(res=> {
     console.log("axios res1: ", res)
     const x = document.cookie
     console.log("document.cookie1: ", x)
     //console.log("document.cookie: ", decodeURIComponent(document.cookie))
     
   })
   .catch(err=> console.log("axios foutje1: ", err))
  }

  const onTest2 = (event:  React.ChangeEvent<HTMLInputElement>) =>{
 
    setChecked2(event.target.checked)
  
    const config={
      method: "GET",
      url: 'http://localhost:8080/test2',
      withCredentials: true
    }
    console.log("axios config2: ", config)
  
    axios(config)
    .then(res=> {
      console.log("axios res2: ", res)
      const x = document.cookie
      console.log("document.cookie2: ", x)
      //console.log("document.cookie: ", decodeURIComponent(document.cookie))
      
    })
    .catch(err=> console.log("axios foutje2: ", err))
   }
 
 
   return (
     <div className="App">
       <header className="App-header">
        <CheckBox
          checked={checked}
          label="test"
          onChange={(event) => onTest1(event)}
        />
        <CheckBox
          checked={checked2}
          label="test2"
          onChange={(event) => onTest2(event)}
        />
       </header>
     </div>
   );
 }

export default App;
