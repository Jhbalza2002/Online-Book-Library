import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./LoginSlice";
import "./Form.css"

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
    <div>
      <form onSubmit={submit}>
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
