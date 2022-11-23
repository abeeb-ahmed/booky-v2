import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import "./dataTable.scss";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

export const DataTable = ({ columns, room }) => {
  const [list, setList] = useState([]);
  // get path
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // fetch data
  const { data } = useFetch(`http://localhost:8800/api/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  // delete handler
  const handleDelete = (id) => {
    const remove = async (id) => {
      try {
        await axios.delete(`http://localhost:8800/api/${path}/${id}`);
        setList(list.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
      }
    };

    remove(id);
  };

  // delete room handler
  const handleRoomDelete = async (id) => {
    try {
      const res = await axios.get("http://localhost:8800/api/hotels");
      const hotels = res.data;
      await Promise.all(
        hotels.map(async (hotel) => {
          await axios.delete(
            `http://localhost:8800/api/rooms/${id}/${hotel._id}`
          );
        })
      );
      setList(list.filter((item) => item._id !== id));
    } catch (error) {}
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
              onClick={() =>
                room
                  ? handleRoomDelete(params.row._id)
                  : handleDelete(params.row._id)
              }
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
