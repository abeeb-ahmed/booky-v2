import { useState } from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import AdminNav from "../../components/adminNav/AdminNav";

import "./new.scss";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const { data, loading } = useFetch(
    "https://booky-web-api.onrender.com/api/hotels"
  );

  // handle form input change
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    setSubmitLoading(true);
    try {
      const res = await axios.post(
        `https://booky-web-api.onrender.com/api/rooms/${hotelId}`,
        {
          ...info,
          roomNumbers,
        }
      );
      navigate("/admin/rooms");
    } catch (error) {
      console.log(error);
      alert("Make sure you fill in all inputs");
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
            <div className="right">
              <form>
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
                    <label>Rooms</label>
                    <textarea
                      placeholder="Give comma between room numbers"
                      onChange={(e) => setRooms(e.target.value)}
                      value={rooms}
                    ></textarea>
                  </div>
                  <div className="formInput">
                    <label>Choose a hotel: </label>
                    <select
                      id="hotelId"
                      onChange={(e) => setHotelId(e.target.value)}
                    >
                      {loading
                        ? "Loading"
                        : data &&
                          data.map((hotel) => (
                            <option key={hotel._id} value={hotel._id}>
                              {hotel.name}
                            </option>
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

export default NewRoom;
