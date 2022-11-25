import { useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

import Sidebar from "../../components/sidebar/Sidebar";
import AdminNav from "../../components/adminNav/AdminNav";

import "./new.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // send form to db
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    setSubmitLoading(true);
    console.log(info);
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/abeebahmed/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post(
        "https://booky-web-app.herokuapp.com/api/auth/register",
        newUser
      );
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      alert("Make sure you fill in all inputs and add an image");
    }
    setSubmitLoading(false);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <AdminNav />
        <div className="newWrapper">
          <div className="top">
            <h2>{title}</h2>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
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
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*"
                    type="file"
                    id="file"
                    style={{ display: "none" }}
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

export default New;
