import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Nav from "../../components/nav/Nav";
import Chart from "../../components/chart/Chart";
import TableList from "../../components/tableList/TableList";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Nav />
        <div className="singleWrapper">
          <div className="singleTop">
            <div className="singleTopLeft">
              <span className="title">Information</span>
              <div className="infoContainer">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="avatar"
                />
                <div className="infoDetail">
                  <h2>Jane Doe</h2>
                  <div className="infoDetailItem">
                    <span>Email:</span>
                    <span>janedoe@gmail.com</span>
                  </div>
                  <div className="infoDetailItem">
                    <span>Phone:</span>
                    <span>j+87 99987 90</span>
                  </div>
                  <div className="infoDetailItem">
                    <span>Address:</span>
                    <span>jElton Street, garden Yd. New York</span>
                  </div>
                  <div className="infoDetailItem">
                    <span>Country:</span>
                    <span>USA</span>
                  </div>
                </div>
              </div>
              <button className="editBtn">Edit</button>
            </div>
            <div className="singleTopRight">
              <Chart aspect={3 / 1} title="User spending (Last 6 months)" />
            </div>
          </div>
          <div className="singleBottom">
            <p className="title">Latest transactions</p>
            <TableList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
