import { Link } from "react-router-dom";

import "./adminList.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminNav from "../../components/adminNav/AdminNav";
import { DataTable } from "../../components/dataTable/DataTable";

const AdminList = ({ title, columns }) => {
  return (
    <div className="adminList">
      <Sidebar />
      <div className="adminListContainer">
        <AdminNav />
        <div className="adminListWrapper">
          <div className="dataTableHeader">
            <h2 className="title">{title}</h2>
            <Link to="new" style={{ textDecoration: "none" }}>
              <button>Add New</button>
            </Link>
          </div>
          <DataTable columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default AdminList;
