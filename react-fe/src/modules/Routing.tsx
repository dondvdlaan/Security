import '../App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SecondPage from './SecondPage';
import Login from './authentication/Login';
import Logout from './authentication/Logout';


function Routing() {

    return (
      <Routes>
        <Route path="/logout"        element={<Logout />} />
        <Route path="/login"         element={<Login />} />
        <Route path="/secondPage"    element={<SecondPage />} />
        <Route path="/home"          element={<Home />} />
      { /* <Route path="/login"          element={<Login children />} /> */}
        <Route path="/"     element={<Navigate to="/home" />} />
      </Routes>
    )
}

export default Routing;
