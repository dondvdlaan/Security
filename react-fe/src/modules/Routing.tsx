import '../App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import TestJava from './TestJava';
import SecondPage from './SecondPage';
import Login from './authentication/LoginNode';
import Logout from './authentication/Logout';
import LoginNode from './authentication/LoginNode';
import LoginJava from './authentication/LoginJava';
import Menu from './Menu';
import TestJakarta from './TestJakarta';
import TestNode from './TestNode';
import LogoutNode from './authentication/LogoutNode';
import LoginJakarta from './authentication/LoginJakarta';


function Routing() {

    return (
      <Routes>
        <Route path="/logout"        element={<Logout />} />

        <Route path="/loginNode"         element={<LoginNode />} />
        <Route path="/logoutNode"         element={<LogoutNode />} />
        <Route path="/loginJava"         element={<LoginJava />} />
        <Route path="/loginJakarta"         element={<LoginJakarta />} />
        <Route path="/secondPage"    element={<SecondPage />} />
        <Route path="/testNode"          element={<TestNode />} />
        <Route path="/testJava"          element={<TestJava />} />
        <Route path="/testJakarta"          element={<TestJakarta />} />
        <Route path="/menu"          element={<Menu />} />
        <Route path="/"     element={<Navigate to="/menu" />} />
      { /* <Route path="/login"          element={<Login children />} /> */}
      </Routes>
    )
}

export default Routing;
