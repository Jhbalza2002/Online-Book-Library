import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo-library.png"

const Navigation = () => {
  const navigate = useNavigate();
  const token =
    window.sessionStorage.getItem("Token") || localStorage.getItem("token");

  return (
    <nav>
       <img src={Logo} alt="Logo" className="Logo-Nav"/>
        <div className="Links">
          <Link to="/books">
            <h1 className="Headers">Home</h1>
          </Link>
        </div>
        <div className="Links">
          <Link to="/account">
            <h1 className="Headers">Account</h1>
          </Link>
        </div>
        {!token && (
          <>
            <div className="Links">
              <Link to="/login">
                <h1 className="Headers">Login</h1>
              </Link>
            </div>
            <div className="Links">
              <Link to="/register">
                <h1 className="Headers">Register</h1>
              </Link>
            </div>
          </>
        )}
        {token && (
          <div className="Links">
            <Link to="/logout">
              <h1 className="Headers">LogOut</h1>
            </Link>
          </div>
        )}
    </nav>
  );
};

export default Navigation;
