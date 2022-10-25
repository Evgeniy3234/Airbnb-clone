import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../RTKSlice/rtkslice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const user = useSelector((store) => store.toolkit.user)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      "http://localhost:3001/auth/login",
      { email, password },
      { withCredentials: true }
    );
    console.log('result data from login', result.data);

    if (result.data.accesstoken) {
      dispatch(getUser({
        id:result.data.id,
        email: result.data.email,
        accesstoken: result.data.accesstoken,
      }))
      navigate("/");
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    console.log('user from login useEffect', user);
  }, [user]);

  const handleChange = (e) => {
    if (e.currentTarget.name === "email") {
      setEmail(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <div>Login</div>
        <div className="login-input">
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
