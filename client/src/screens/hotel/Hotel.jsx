import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleXmark,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import Nav from "../../components/nav/Nav";
import Header from "../../components/header/Header";
import MailingList from "../../components/mailingList/MailingList";
import Footer from "../../components/footer/Footer";
import "./hotel.css";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../context/search/searchContext";
import { AuthContext } from "../../context/auth/authContext";
import Reserve from "../../components/reserve/Reserve";
import { useEffect } from "react";

const Hotel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);
  const location = useLocation().pathname;
  const id = location.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [photosLastNumber, setPhotosLastNumber] = useState(0);

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  //   Handle image modal open
  const handleClick = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  //   Close image modal
  const closeModal = () => {
    setOpen(false);
  };
  const { data, loading } = useFetch(
    `https://booky-web-api.onrender.com/api/hotels/find/${id}`
  );
  useEffect(() => {
    setPhotosLastNumber(Number(data?.photos?.length) - 1);
  }, [data]);

  //   Move images in modal
  const handleMove = (direction) => {
    let newSliderNumber;
    if (direction === "l") {
      newSliderNumber = slideNumber === 0 ? photosLastNumber : slideNumber - 1;
    } else {
      newSliderNumber = slideNumber === photosLastNumber ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSliderNumber);
  };

  const milisecondsPerDay = 86400000;

  // find the difference between two dates in days. Date2 should be latest date
  const dayDifference = (date1, date2) => {
    if (dates) {
      const diff = Math.abs(date2?.getTime()) - Math.abs(date1?.getTime());
      const diffCeil = Math.ceil(diff / milisecondsPerDay);
      if (diffCeil === 0) {
        return 1;
      } else {
        return diffCeil;
      }
    } else return;
  };

  const dayDiff = dayDifference(dates[0], dates[1]);

  const handleReserve = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Nav />
      <Header type="list" />
      {
        <>
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <div className="sliderWrapper">
                  <FontAwesomeIcon
                    onClick={closeModal}
                    className="closeIcon"
                    icon={faCircleXmark}
                  />
                  <FontAwesomeIcon
                    onClick={() => handleMove("l")}
                    className="arrowIcon"
                    icon={faArrowLeft}
                  />
                  <img
                    src={data?.photos[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                  <FontAwesomeIcon
                    onClick={() => handleMove("r")}
                    className="arrowIcon"
                    icon={faArrowRight}
                  />
                </div>
              </div>
            )}
            {loading ? (
              "Loading..."
            ) : (
              <>
                <div className="hotelWrapper">
                  <h1 className="hotelTitle">{data?.name}</h1>
                  <div className="hotelAddress">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{data?.address}</span>
                  </div>
                  <div className="hotelDesc">
                    <span className="hotelDistance">
                      {data?.distance}km from center
                    </span>
                    <span className="hotelPriceHighlight">
                      Book a stay over 20 dollars at this property and get free
                      airport taxi
                    </span>
                  </div>
                  <div className="hotelImages">
                    {data.photos?.map((photo, i) => (
                      <img
                        onClick={() => handleClick(i)}
                        src={photo}
                        alt=""
                        key={i}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </div>
                  <div className="hotelDetails">
                    <div className="hDetailsFirst">
                      <h2>{data?.title}</h2>
                      <p>{data?.desc}</p>
                    </div>
                    <div className="hDetailsSecond">
                      <h2>Property verification</h2>
                      <p>
                        {data.name} is hosted and verified by booky.com. We can
                        guarantee a wonderful experience for the duration of
                        your stay.
                      </p>
                      <span>
                        <strong style={{ marginRight: "5px" }}>
                          {/* Calculates total price to be paid */}$
                          {options?.room * data?.cheapestPrice * dayDiff ||
                            data?.cheapestPrice}
                        </strong>
                        ({dayDiff || 1} nights)
                      </span>
                      <button onClick={handleReserve}>
                        Reserve or Book Now!
                      </button>
                    </div>
                  </div>
                </div>
                <MailingList />
                <Footer />
              </>
            )}
            {openModal && <Reserve hotelId={id} setOpenModal={setOpenModal} />}
          </div>
        </>
      }
    </div>
  );
};

export default Hotel;
