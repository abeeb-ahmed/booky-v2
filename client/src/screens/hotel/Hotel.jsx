import { useState } from "react";
import { useLocation } from "react-router-dom";
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

const Hotel = () => {
  const location = useLocation().pathname;
  const id = location.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  //   Handle image modal open
  const handleClick = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  //   Close image modal
  const closeModal = () => {
    setOpen(false);
  };

  //   Move images in modal
  const handleMove = (direction) => {
    let newSliderNumber;
    if (direction === "l") {
      newSliderNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSliderNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSliderNumber);
  };

  const { data, loading } = useFetch(
    `http://localhost:8800/api/hotels/find/${id}`
  );

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
              <div className="hotelWrapper">
                <h1 className="hotelTitle">{data?.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data?.address}</span>
                </div>
                <div className="hotelDesc">
                  <span className="hotelDistance">{data?.distance}</span>
                  <span className="hotelPriceHighlight">
                    Book a stay over 20 dollars at this property and get free
                    airport taxi
                  </span>
                </div>
                <div className="hotelImages">
                  {data.photos?.map((photo, i) => (
                    <img onClick={() => handleClick(i)} src={photo} alt="" />
                  ))}
                </div>
                <div className="hotelDetails">
                  <div className="hDetailsFirst">
                    <h2>{data?.title}</h2>
                    <p>{data?.desc}</p>
                  </div>
                  <div className="hDetailsSecond">
                    <h2>Perfect for a 9-night stay!</h2>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Dignissimos vero fuga magni voluptatibus blanditiis. Quis!
                    </p>
                    <span>
                      <strong style={{ marginRight: "5px" }}>$945</strong>
                      (9 nights)
                    </span>
                    <button>Reserve or Book Now!</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <MailingList />
          <Footer />
        </>
      }
    </div>
  );
};

export default Hotel;
