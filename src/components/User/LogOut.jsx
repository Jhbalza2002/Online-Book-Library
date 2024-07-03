import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "./LogoutSlice";

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    clearTokens();
    window.sessionStorage.removeItem("Token");
    localStorage.removeItem("token");
    navigate("/login");
    
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default LogOut;