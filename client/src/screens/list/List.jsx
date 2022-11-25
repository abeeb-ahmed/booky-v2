import { useState } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Header from "../../components/header/Header";
import MailingList from "../../components/mailingList/MailingList";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/nav/Nav";
import "./list.css";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../context/search/searchContext";

const List = () => {
  const { dispatch } = useContext(SearchContext);
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState([
    location.state.dates[0],
    location.state.dates[1],
  ]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000000000);
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

  // fetch hotels from db
  const { loading, data, reFetch } = useFetch(
    `https://booky-web-app.onrender.com/api/hotels?city=${destination}&min=${minPrice}&max=${maxPrice}`
  );

  // handle search
  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, dates, options },
    });
    reFetch(
      `https://booky-web-app.onrender.com/api/hotels?city=${destination}&min=${minPrice}&max=${maxPrice}`
    );
  };

  return (
    <div>
      <Nav />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h2>Search</h2>
            <div className="listSearchItem">
              <label>Destination</label>
              <input
                type="text"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="listSearchItem">
              <label>Date</label>
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
                  />
                </div>
              )}
            </div>
            <div className="listSearchItem">
              <label>Options</label>
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
                      <button onClick={() => handleOption("children", "i")}>
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
            <div className="listPrice">
              <div className="listPriceItem">
                <span>Min price ($)</span>
                <input
                  type="number"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="listPriceItem">
                <span>Max price ($)</span>
                <input
                  type="number"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <button className="listSearchButton" onClick={handleSearch}>
              Search
            </button>
          </div>
          <>
            {loading ? (
              "Loading"
            ) : (
              <div className="listMain">
                {data.map((item) => {
                  return <SearchItem key={item._id} data={item} />;
                })}
              </div>
            )}
          </>
        </div>
      </div>
      <MailingList />
      <Footer />
    </div>
  );
};

export default List;
