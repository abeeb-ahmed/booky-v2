import { useState, useContext } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useFetch from "../../hooks/useFetch";
import "./reserve.css";
import { SearchContext } from "../../context/search/searchContext";

const Reserve = ({ hotelId, setOpenModal }) => {
  const navigate = useNavigate();
  const { dates } = useContext(SearchContext);
  const { data, loading } = useFetch(
    `https://booky-web-app.onrender.com/api/hotels/room/${hotelId}`
  );

  const [selectedRooms, setSelectedRooms] = useState([]);

  //   handle room selection
  const handleCheck = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  //   Get dates range
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const allDates = getDatesInRange(dates[0], dates[1]);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  //   handle reserve
  const handleReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `https://booky-web-app.herokuapp.com/api/rooms/availability/${roomId}`,
            { dates: allDates }
          );
          return res;
        })
      );
      setOpenModal(false);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="reserve">
      <div className="reserveContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="close"
          onClick={() => setOpenModal(false)}
        />
        <p className="title">Select your rooms:</p>
        {data.map((item) => {
          return (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="room">
                {item.roomNumbers.map((item) => (
                  <div key={item._id}>
                    <span>{item.number}</span>
                    <input
                      className="roomInput"
                      onChange={handleCheck}
                      type="checkbox"
                      value={item._id}
                      disabled={!isAvailable(item)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <button disabled={selectedRooms.length === 0} onClick={handleReserve}>
          Reserve!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
