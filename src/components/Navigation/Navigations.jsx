import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"
const Navigation = () => {
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem("Token") || localStorage.getItem("token");

  const handleLogout = () => {
    window.sessionStorage.removeItem("Token");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };



  return (
    <nav>
      <ul>
        <li className="Links">
          <Link to="/books"><h1 className="Headers">Home</h1></Link>
        </li>
        <li className="Links">
          <Link to="/account"><h1 className="Headers">Account</h1></Link>
        </li>
        {!token && (
          <>
            <li className="Links">
              <Link to="/login"><h1 className="Headers">Login</h1></Link>
            </li>
            <li className="Links">
              <Link to="/register"><h1 className="Headers">Register</h1></Link>
            </li>
          </>
        )}
        {token && (
          <li className="Links">
            <Link onClick={handleLogout} className="btn btn-danger mt-3">
              <h1 className="Headers">Logout</h1>
            </Link>
          </li>
        )}
        <li>
            
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
