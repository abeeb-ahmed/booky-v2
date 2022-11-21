import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

import "./featured.scss";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <span className="title">Total Revenue</span>
        <MoreVertOutlinedIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text="70%" strokeWidth={5} />
        </div>
        <span className="desc">Total sales made today</span>
        <span className="amount">$420</span>
        <span className="detail">
          Previous transactions processing. Last payments may not be included
        </span>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              $12.4k
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              $12.4k
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              $12.4k
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
