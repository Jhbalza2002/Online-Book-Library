import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navigation = () => {
  const navigate = useNavigate();
  const token =
    window.sessionStorage.getItem("Token") || localStorage.getItem("token");

  return (
    <nav>
      <ul>
        <li className="Links">
          <Link to="/books">
            <h1 className="Headers">Home</h1>
          </Link>
        </li>
        <li className="Links">
          <Link to="/account">
            <h1 className="Headers">Account</h1>
          </Link>
        </li>
        {!token && (
          <>
            <li className="Links">
              <Link to="/login">
                <h1 className="Headers">Login</h1>
              </Link>
            </li>
            <li className="Links">
              <Link to="/register">
                <h1 className="Headers">Register</h1>
              </Link>
            </li>
          </>
        )}
        {token && (
          <li className="Links">
            <Link to="/logout">
              <h1 className="Headers">LogOut</h1>
            </Link>
          </li>
        )}
        <li></li>
      </ul>
    </nav>
  );
};

export default Navigation;
