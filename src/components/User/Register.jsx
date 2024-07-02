import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./RegisterSlice";

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
    <div>
      <form onSubmit={submit}>
      <div className="form-group">
          <label>First Name</label>
          <input
            type="firstname"
            className="form-control"
            aria-describedby="firstname"
            placeholder="First name"
            name="firstname"
            onChange={updateForm}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="lastname"
            className="form-control"
            aria-describedby="lastname"
            placeholder="Last name"
            name="lastname"
            onChange={updateForm}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={updateForm}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={updateForm}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

