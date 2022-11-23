import { useContext } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

import logo from "./../../assets/images/myadmin.png";
import "./sidebar.scss";
import { DarkModeContext } from "../../context/darkMode/darkModeContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

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
            <li className="sidebarItem">
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
            <li className="sidebarItem">
              <ExitToAppOutlinedIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
        <div className="sidebarBottom">
          <p>THEME</p>
          <div className="colorOptions">
            <div
              onClick={() => dispatch({ type: "LIGHT" })}
              className="colorOption"
            ></div>
            <div
              onClick={() => dispatch({ type: "DARK" })}
              className="colorOption"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
