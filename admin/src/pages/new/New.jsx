import { useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

import Sidebar from "../../components/sidebar/Sidebar";
import Nav from "../../components/nav/Nav";

import "./new.scss";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
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
                        />
                      </div>
                    );
                  })}
                </div>
                <button>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
