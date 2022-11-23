import { useContext } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

import "./sidebar.scss";
import { DarkModeContext } from "../../context/darkMode/darkModeContext";
import { AuthContext } from "../../context/auth/authContext";

const Sidebar = () => {
  const { modeDispatch } = useContext(DarkModeContext);
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="sidebarContainer">
        <div className="sidebarTop">
          <div className="sidebarLogo">
            <Link
              to="/"
              style={{
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "22px",
              }}
            >
              Booky
            </Link>
          </div>
        </div>
        <div className="sidebarMiddle">
          <ul>
            <p>MAIN</p>
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <li className="sidebarItem">
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <p>LISTS</p>
            <Link to="/admin/users" style={{ textDecoration: "none" }}>
              <li className="sidebarItem">
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
            <Link to="/admin/hotels" style={{ textDecoration: "none" }}>
              <li className="sidebarItem">
                <StoreIcon className="icon" />
                <span>Hotels</span>
              </li>
            </Link>
            <Link to="/admin/rooms" style={{ textDecoration: "none" }}>
              <li className="sidebarItem">
                <CreditCardIcon className="icon" />
                <span>Rooms</span>
              </li>
            </Link>

            <p>USER</p>
            <li
              className="sidebarItem"
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              <ExitToAppOutlinedIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
        <div className="sidebarBottom">
          <p>THEME</p>
          <div className="colorOptions">
            <div
              onClick={() => modeDispatch({ type: "LIGHT" })}
              className="colorOption"
            ></div>
            <div
              onClick={() => modeDispatch({ type: "DARK" })}
              className="colorOption"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
