import { Link } from "react-router-dom";

import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Nav from "../../components/nav/Nav";
import { DataTable } from "../../components/dataTable/DataTable";

const List = ({ title }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Nav />
        <div className="listWrapper">
          <div className="dataTableHeader">
            <h2 className="title">{title}</h2>
            <Link to="new" style={{ textDecoration: "none" }}>
              <button>Add New</button>
            </Link>
          </div>
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default List;
