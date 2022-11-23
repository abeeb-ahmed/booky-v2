import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminNav from "../../components/adminNav/AdminNav";
import Chart from "../../components/chart/Chart";
import TableList from "../../components/tableList/TableList";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

const Single = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { data } = useFetch(`http://localhost:8800/api/users/${id}`);
  console.log(data);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <AdminNav />
        <div className="singleWrapper">
          <div className="singleTop">
            <div className="singleTopLeft">
              <span className="title">Information</span>
              <div className="infoContainer">
                <img
                  src={
                    data.img ||
                    "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA="
                  }
                  alt="avatar"
                />
                <div className="infoDetail">
                  <div className="infoDetailItem">
                    <span>Username:</span>
                    <span>{data.username}</span>
                  </div>
                  <div className="infoDetailItem">
                    <span>Email:</span>
                    <span>{data.email}</span>
                  </div>
                  <div className="infoDetailItem">
                    <span>Phone:</span>
                    <span>{data.phone}</span>
                  </div>
                  <div className="infoDetailItem">
                    <span>City:</span>
                    <span>{data.city}</span>
                  </div>
                  <div className="infoDetailItem">
                    <span>Country:</span>
                    <span>{data.country}</span>
                  </div>
                </div>
              </div>
              <button className="editBtn">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
