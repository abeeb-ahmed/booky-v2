import { useContext } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

import "./nav.scss";
import { DarkModeContext } from "../../context/darkModeContext";

const Nav = () => {
  const { dispatch, darkMode } = useContext(DarkModeContext);

  return (
    <div className="nav">
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
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          ) : (
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          )}
        </div>
        <div className="item">
          <FullscreenExitOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="counter">1</div>
        </div>
        <div className="item">
          <ChatBubbleOutlineOutlinedIcon className="icon" />
          <div className="counter">2</div>
        </div>
        <div className="item">
          <ListOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <img
            src="data:image/jpeg;base64,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"
            alt="avatar"
            className="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
