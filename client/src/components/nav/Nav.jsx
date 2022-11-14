import React, { useState } from "react";

import { Link } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./nav.css";

const Nav = () => {
  const [toggled, setToggled] = useState(false); // Toggle mobile navbar
  return (
    <div className="nav">
      <div className="navContainer">
        <Link to="/">
          <span className="logoText">Booky</span>
        </Link>
        <ul className="navLinks">
          <Link to="#" className="link">
            Register
          </Link>
          <Link to="#" className="link">
            Login
          </Link>
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
              <Link to="#" className="link">
                Register
              </Link>
              <Link to="#" className="link">
                Login
              </Link>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
