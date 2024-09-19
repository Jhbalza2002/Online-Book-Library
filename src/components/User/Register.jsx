import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./RegisterSlice";
import "./Register.css";
import Logo from "../../assets/Log-Register-img.jpg"

export default function Register() {
  const [registerUser] = useRegisterMutation();
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
      const result = await registerUser(form).unwrap();
      if (result.token) {
        localStorage.setItem("token", result.token);
        navigate("/account");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Register-MainContainer">
      <div className="Register-left-Panel">
        <form className="Register-form" onSubmit={submit}>
          <h1 className="Register-welcome-message"> Welcome! <br></br>Register to Get Started</h1>
          <div className="Register-form-group">
            <label>First Name</label>
            <input
              type="firstname"
              className="Register-form-control"
              aria-describedby="firstname"
              placeholder="First name"
              name="firstname"
              onChange={updateForm}
            />
          </div>
          <div className="Register-form-group">
            <label>Last Name</label>
            <input
              type="lastname"
              className="Register-form-control"
              aria-describedby="lastname"
              placeholder="Last name"
              name="lastname"
              onChange={updateForm}
            />
          </div>
          <div className="Register-form-group">
            <label>Email address</label>
            <input
              type="email"
              className="Register-form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={updateForm}
            />
          </div>
          <div className="Register-form-group">
            <label>Password</label>
            <input
              type="password"
              className="Register-form-control"
              placeholder="Password"
              name="password"
              onChange={updateForm}
            />
          </div>
          <button type="submit" className="Register-LogButton">
            Submit
          </button>
        </form>
      </div>
      <div className="Register-Right-Panel">
          <img
           src={Logo} alt="Logo"
            className="Register-Img-log"
          ></img>
        </div>
    </div>
  );
}
