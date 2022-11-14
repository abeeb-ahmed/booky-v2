import { useState } from "react";
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

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const photos = [
    "https://www.baglionihotels.com/wp-content/themes/baglioni-hotels-new/images/schema/baglioni-hotel-london.jpg",
    "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
    "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/292508265.jpg?k=bb0495033b84aede6926a6faee423f53c8d9d7c87134fc4ebb0e4622bf8d0c7f&o=&hp=1",
    "https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=",
    "https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=",
  ];

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

  return (
    <div>
      <Nav />
      <Header type="list" />
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
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
              <FontAwesomeIcon
                onClick={() => handleMove("r")}
                className="arrowIcon"
                icon={faArrowRight}
              />
            </div>
          </div>
        )}

        <div className="hotelWrapper">
          <h1 className="hotelTitle">Grand Hotel</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>24 Bishop Street, Surulere</span>
          </div>
          <div className="hotelDesc">
            <span className="hotelDistance">500m from center</span>
            <span className="hotelPriceHighlight">
              Book a stay over 20 dollars at this property and get free airport
              taxi
            </span>
          </div>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <img onClick={() => handleClick(i)} src={photo} alt="" />
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hDetailsFirst">
              <h2>Stay in the heart of Lagos</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Architecto excepturi molestias quibusdam eligendi praesentium,
                totam dolore ad distinctio voluptate. Dolor. Lorem ipsum, dolor
                sit amet consectetur adipisicing elit. Quasi non sapiente
                soluta. Culpa suscipit quos vero molestias, aut assumenda? Ex.
              </p>
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
      </div>
      <MailingList />
      <Footer />
    </div>
  );
};

export default Hotel;
