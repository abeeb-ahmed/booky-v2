import { useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

import Sidebar from "../../components/sidebar/Sidebar";
import Nav from "../../components/nav/Nav";

import "./new.scss";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const NewHotel = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { loading, data } = useFetch(
    "https://booky-web-app.herokuapp.com/api/rooms"
  );

  // handle form input change
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/abeebahmed/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post(
        "https://booky-web-app.herokuapp.com/api/hotels",
        newHotel
      );
      navigate("/admin/hotels");
    } catch (error) {
      console.log(error);
      alert("Make sure you fill in all inputs and add images");
    }
    setSubmitLoading(false);
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Nav />
        <div className="newWrapper">
          <div className="top">
            <h2>{title}</h2>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="avatar"
              />
            </div>
            <div className="right">
              <form>
                <div className="imgUpload">
                  <label htmlFor="file">
                    Add image:
                    <DriveFolderUploadIcon
                      style={{ cursor: "pointer", marginLeft: 5 }}
                    />
                  </label>
                  <input
                    onChange={(e) => setFiles(e.target.files)}
                    accept="image/*"
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    multiple
                  />
                </div>
                <div className="formContainer">
                  {inputs.map((input) => {
                    return (
                      <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
                        <input
                          type={input.type}
                          placeholder={input?.placeholder}
                          id={input.id}
                          onChange={handleChange}
                        />
                      </div>
                    );
                  })}
                  <div className="formInput">
                    <label>Featured</label>
                    <select id="featured" onChange={handleChange}>
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                  <div className="formInput room">
                    <label>Rooms</label>
                    <select multiple id="rooms" onChange={handleSelect}>
                      {loading
                        ? "loading"
                        : data &&
                          data.map((item) => (
                            <option value={item._id}>{item.title}</option>
                          ))}
                    </select>
                  </div>
                </div>
                <button onClick={handleSubmit} disabled={submitLoading}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
