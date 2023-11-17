import React, { useEffect, useState } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/api/authAPI";
function Header() {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };
  const handleSubmitLogout = () => {
    logOut(dispatch, navigate);
  };
  return (
    <header className="header-container">
      <Link className="header-logo" to="/">
        VideoSharing
      </Link>
      <nav className="header-nav">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </nav>
      <div className="auth">
        {currentUser ? (
          <div className="auth-logged-in">
            <span
              className="auth-username"
              onClick={() => navigate(`/profile/${currentUser.userId}`)}
            >
              Welcome, {currentUser.username}
            </span>
            <Link
              to="/login"
              className="auth-logout"
              onClick={handleSubmitLogout}
            >
              Log out
            </Link>
          </div>
        ) : (
          <Link to="/login" className="auth-btn">
            Sign Up
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
