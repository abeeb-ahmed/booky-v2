import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { Link } from "react-router-dom";

const Widget = ({ amount, title, link, icon }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">{amount}</span>
        <Link to={link} style={{ textDecoration: "none" }}>
          <span className="link">See all</span>
        </Link>
      </div>
      <div className="right">{icon}</div>
    </div>
  );
};

export default Widget;
