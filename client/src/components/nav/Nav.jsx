import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./nav.css";
import { AuthContext } from "../../context/auth/authContext";

const Nav = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [toggled, setToggled] = useState(false); // Toggle mobile navbar

  // Handle logout

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="nav">
      <div className="navContainer">
        <Link to="/">
          <span className="logoText">Booky</span>
        </Link>
        <ul className="navLinks">
          {!user ? (
            <>
              <Link to="/register" className="link">
                Register
              </Link>
              <Link to="/login" className="link">
                Login
              </Link>
            </>
          ) : (
            <span>
              Welcome {user.username}
              <button className="logoutBtn" onClick={handleLogout}>
                Logout
              </button>
            </span>
          )}
        </ul>
        <div className="toggleIconContainer">
          <FontAwesomeIcon
            onClick={() => setToggled(!toggled)}
            icon={toggled ? faXmark : faBars}
            className={`toggleIcon ${toggled && "toggleMode"} `}
          />
        </div>
      </div>
      {toggled && (
        <div className="navLinksMobile">
          <ul>
            <div className="links">
              {!user ? (
                <>
                  <Link to="/register" className="link">
                    Register
                  </Link>
                  <Link to="/login" className="link">
                    Login
                  </Link>
                </>
              ) : (
                <span>
                  Welcome {user.username}
                  <button className="logoutBtn" onClick={handleLogout}>
                    Logout
                  </button>
                </span>
              )}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
