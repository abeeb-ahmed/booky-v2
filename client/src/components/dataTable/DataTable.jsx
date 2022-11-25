import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import "./dataTable.scss";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

export const DataTable = ({ columns, room = false }) => {
  const [list, setList] = useState([]);
  // get path
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // fetch data
  const { data } = useFetch(`https://booky-web-app.onrender.com/api/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  // delete handler
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://booky-web-app.onrender.com/api/${path}/${id}`
      );
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Action column to view and delete items
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="actionContainer">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dataTable">
      <DataGrid
        className="dataTableContainer"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};
