import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    window.sessionStorage.removeItem("Token");
    localStorage.removeItem("token");
    navigate("/login");
      window.location.reload();
  }, []);

  return <div>LogOut</div>;
}
