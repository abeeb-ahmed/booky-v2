import { useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({ hotelId, setOpenModal }) => {
  const { data, loading } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
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
                      style={{ cursor: "pointer" }}
                      onChange={(e) => handleCheck(e)}
                      type="checkbox"
                      value={item._id}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reserve;
