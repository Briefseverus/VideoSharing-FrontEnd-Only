import React from 'react';
import './register.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/api/authAPI";
import { registerSuccess, registerFailed } from "../../redux/authSlice";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
      username: username,
    };
    registerUser(newUser, dispatch, navigate, registerSuccess, registerFailed);
  };
  return (
    <div className="register">
      <div className="register-box">
        <h2>Register</h2>
        {errorMessage && <div className="register-error-message">{errorMessage}</div>}
        <form onSubmit={handleRegister}>
          <div className="user-box">
            <input type="text" name="username" onChange={(e) => setUserName(e.target.value)} required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="password" name="password"  onChange={(e) => setPassword(e.target.value)} required />
            <label>Password</label>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
