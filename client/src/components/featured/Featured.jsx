import React from "react";

import "./featured.css";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch(
    "https://booky-web-app.onrender.com/api/hotels/countByCity?cities=Lagos,Berlin,London"
  );
  // handle click
  const handleClick = async (city) => {
    const { data } = await axios.get(
      `https://booky-web-app.onrender.com/api/hotels?city=${city}`
    );
    navigate("/hotels/category", { state: data });
  };

  return (
    <div className="featured">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="featuredItem" onClick={() => handleClick("lagos")}>
            <img
              src="https://www.transcorphotels.com/wp-content/uploads/2018/05/Untitled-4-1.png"
              alt=""
            />
            <div className="featuredTitles">
              <h1>Lagos</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem" onClick={() => handleClick("berlin")}>
            <img
              src="https://www.planetware.com/photos-large/D/germany-berlin-gendarmenmarkt.jpg"
              alt=""
            />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem" onClick={() => handleClick("london")}>
            <img
              src="https://i0.wp.com/tiqets-cdn.s3.eu-west-1.amazonaws.com/wordpress/blog/wp-content/uploads/2020/09/shutterstock_1013811547.jpg?resize=1000%2C667&ssl=1"
              alt=""
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
