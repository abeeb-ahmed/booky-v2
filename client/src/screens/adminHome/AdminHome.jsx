import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";

import AdminNav from "../../components/adminNav/AdminNav";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import "./adminHome.scss";
import useFetch from "../../hooks/useFetch";

const AdminHome = () => {
  const hotelsData = useFetch("https://booky-web-app.onrender.com/api/hotels");
  const roomsData = useFetch("https://booky-web-app.onrender.com/api/rooms");
  const usersData = useFetch("https://booky-web-app.onrender.com/api/users");
  const usersLength = usersData.data.length;
  const roomsLength = roomsData.data.length;
  const hotelsLength = hotelsData.data.length;

  return (
    <div className="adminHome">
      <Sidebar />
      <div className="adminHomeContainer">
        <AdminNav />
        <div className="widgets">
          <Widget
            amount={usersLength}
            icon={
              <PersonOutlineIcon
                className="icon"
                style={{
                  color: "crimson",
                  backgroundColor: "rgba(225, 0, 0, 0.2",
                }}
              />
            }
            title="Users"
            link="/admin/users"
          />
          <Widget
            amount={hotelsLength}
            icon={
              <HomeOutlinedIcon
                className="icon"
                style={{
                  color: "goldenrod",
                  backgroundColor: "rgba(218, 164, 32, 0.2",
                }}
              />
            }
            title="Hotels"
            link="/admin/hotels"
          />
          <Widget
            amount={roomsLength}
            icon={
              <HotelOutlinedIcon
                className="icon"
                style={{
                  color: "green",
                  backgroundColor: "rgba(0, 128, 0, 0.2",
                }}
              />
            }
            title="Rooms"
            link="/admin/rooms"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
