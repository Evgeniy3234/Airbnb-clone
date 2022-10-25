import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      "http://localhost:3001/auth/signup",
      { name, email, password },
      { withCredentials: true }
    );

    if (!result.error) {
      console.log(result.data);
      navigate("/login");
    } else {
      console.log(result.error);
    }
  };

  const handleChange = (e) => {
  if (e.currentTarget.name === "name") {
    setName(e.currentTarget.value)
  } else if (e.currentTarget.name === "email") {
      setEmail(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <div>Register</div>
        <div className="login-input">
        <input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="name"
          />
          <input
            value={email}
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            value={password}
            onChange={handleChange}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
