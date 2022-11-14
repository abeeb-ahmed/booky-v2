import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCar,
  faUsers,
  faTaxi,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./header.css";
import { useContext } from "react";
import { SearchContext } from "../../context/search/searchContext";

const Header = ({ type = "" }) => {
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    new Date(Date.now()),
    new Date(Date.now()),
  ]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [options, setOptions] = useState({
    adults: 1,
    children: 0,
    room: 1,
  });

  //   Function to format date
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("/");
  }

  // Handle options selection
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "d" ? options[name] - 1 : options[name] + 1,
      };
    });
  };

  // Handle option toogle
  const handleOptionOpen = () => {
    setOptionOpen(!optionOpen);
    setCalendarOpen(false);
  };

  // Handle calendar toogle
  const handleCalendarOpen = () => {
    setCalendarOpen(!calendarOpen);
    setOptionOpen(false);
  };

  // Handle search
  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, options, dates },
    });
    if (destination !== "") {
      navigate("/hotels", {
        state: {
          destination,
          options,
          dates,
        },
      });
    } else {
      alert("Pick a destination");
    }
  };

  return (
    <>
      <div className="header">
        <div className="headerContainer">
          <div
            className={`${
              type === "list" ? "headerCategories listMode" : "headerCategories"
            }`}
          >
            <div className="headerCategory active">
              <FontAwesomeIcon icon={faBed} className="headerIcon" />
              <span>Stay</span>
            </div>
            <div className="headerCategory">
              <FontAwesomeIcon icon={faPlane} className="headerIcon" />
              <span>Flights</span>
            </div>
            <div className="headerCategory">
              <FontAwesomeIcon icon={faCar} className="headerIcon" />
              <span>Car Rentals</span>
            </div>
            <div className="headerCategory">
              <FontAwesomeIcon icon={faUsers} className="headerIcon" />
              <span>Attractions</span>
            </div>
            <div className="headerCategory">
              <FontAwesomeIcon icon={faTaxi} className="headerIcon" />
              <span>Airport Taxis</span>
            </div>
          </div>
          {type !== "list" && (
            <>
              <div className="headerTitle">
                <h1>Find your next stay</h1>
                <h2>Search deals on hotels, homes, and much more...</h2>
              </div>
              <div className="headerSearchContainer">
                <div className="headerSearch">
                  <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} className="headerIcon" />
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  <div className="headerSearchItem">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="headerIcon"
                    />
                    <span onClick={handleCalendarOpen}>
                      {`${formatDate(dates[0])} to ${formatDate(dates[1])}`}
                    </span>
                    {/* Popup calendar */}
                    {calendarOpen && (
                      <div className="headerCalendar">
                        <Calendar
                          selectRange={true}
                          onChange={setDates}
                          value={dates}
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                    <span
                      onClick={handleOptionOpen}
                    >{`${options.adults} adult • ${options.children} children • ${options.room} room`}</span>

                    {/* Options selection */}
                    {optionOpen && (
                      <div className="options">
                        <div className="optionItem">
                          <span className="optionText">Adult</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.adults === 1}
                              onClick={() => handleOption("adults", "d")}
                            >
                              -
                            </button>
                            <span>{options.adults}</span>
                            <button onClick={() => handleOption("adults", "i")}>
                              +
                            </button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Children</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.children === 0}
                              onClick={() => handleOption("children", "d")}
                            >
                              -
                            </button>
                            <span>{options.children}</span>
                            <button
                              onClick={() => handleOption("children", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Room</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.room === 1}
                              onClick={() => handleOption("room", "d")}
                            >
                              -
                            </button>
                            <span>{options.room}</span>
                            <button onClick={() => handleOption("room", "i")}>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="headerSearchItem">
                    <div className="btn" onClick={handleSearch}>
                      Search
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
