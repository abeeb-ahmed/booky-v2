import { useContext } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import "./adminNav.scss";
import { DarkModeContext } from "../../context/darkMode/darkModeContext";
import { AuthContext } from "../../context/auth/authContext";

const AdminNav = () => {
  const { modeDispatch, darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="adminNav">
      <div className="search">
        <input type="text" placeholder="Search..." />
        <SearchOutlinedIcon className="icon" />
      </div>
      <div className="items">
        <div className="item">
          <LanguageOutlinedIcon className="icon" />
          <span>English</span>
        </div>
        <div className="item">
          {darkMode ? (
            <LightModeOutlinedIcon
              className="icon"
              onClick={() => modeDispatch({ type: "TOGGLE" })}
            />
          ) : (
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => modeDispatch({ type: "TOGGLE" })}
            />
          )}
        </div>

        <div className="item">
          <span>{user.username}</span>
          <img
            src={
              user.img ||
              "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA="
            }
            alt="avatar"
            className="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
