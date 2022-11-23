import AdminNav from "../../components/adminNav/AdminNav";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featuredWidget/FeaturedWidget";
import Chart from "../../components/chart/Chart";
import "./adminHome.scss";
import TableList from "../../components/tableList/TableList";

const AdminHome = () => {
  return (
    <div className="adminHome">
      <Sidebar />
      <div className="adminHomeContainer">
        <AdminNav />

        <div className="table">
          <span className="title">Latest Transactions</span>
          <TableList />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
