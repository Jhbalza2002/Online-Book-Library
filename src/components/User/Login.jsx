import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./LoginSlice";
import "./Login.css";
import Logo from "../../assets/Log-Register-img.jpg"

export default function Login() {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(form).unwrap();
      if (result.token) {
        localStorage.setItem("token", result.token);
        navigate("/account");
      }
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="Login-MainContainer">
      <div className="Login-left-Panel">
        <form className="Login-form" onSubmit={submit}>
        <h1 className="Log-welcome-message">Welcome Back! <br></br>Log In to Access Your Account</h1>
          <div className="Login-form-group">
            <label>Email address</label>
            <input
              type="email"
              className="Login-form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={updateForm}
            />
          </div>
          <div className="Login-form-group">
            <label>Password</label>
            <input
              type="password"
              className="Login-form-control"
              placeholder="Password"
              name="password"
              onChange={updateForm}
            />
          </div>
          <button type="submit" className="Login-LogButton">
            Submit
          </button>
        </form>
      </div>
      <div className="Login-Right-Panel">
        <img
          src={Logo} alt="Logo"
          className="Login-Img-log"
        ></img>
      </div>
    </div>
  );
}
