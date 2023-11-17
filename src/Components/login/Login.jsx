// Login.jsx

import React, {useState,useEffect} from 'react';
import './login.css'
import {loginFailed,loginSuccess} from '../../redux/authSlice'
import { Link, useNavigate, } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { loginUser } from "../../redux/api/authAPI";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password
    };

    try {
      setError(""); // Xóa thông báo lỗi trước đó (nếu có)
      const res = await loginUser(newUser, dispatch, navigate);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      setError("Wrong username or password"); // Đặt thông báo lỗi
    }
  }
  return (
    <div className="login">
      <div className="login-box">
        <h2>Login</h2>
       {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input type="text" name="" onChange={(e) => setUserName(e.target.value)}  required=""/>
            <label>Username</label>
          </div>
          
          <div className="user-box">
            <input type="password" name="" onChange={(e) => setPassword(e.target.value)}  required=""/>
            <label>Password</label>
          </div>
          
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
          <Link to='/register' >register</Link>
      </div>
    </div>
  );
}

export default Login;