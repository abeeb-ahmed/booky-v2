import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import "./dataTable.scss";
import { rows, columns } from "../../assets/tempData/datatableSource";

// Action column to view and delete items
const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: () => {
      return (
        <div className="actionContainer">
          <Link to="/users/test" style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton">Delete</div>
        </div>
      );
    },
  },
];

export const DataTable = () => {
  return (
    <div className="dataTable">
      <DataGrid
        className="dataTableContainer"
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};
