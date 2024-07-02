import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    window.sessionStorage.removeItem("Token");
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return <div>Logging out...</div>; 
}