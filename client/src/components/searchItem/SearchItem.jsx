import { Link, useNavigate } from "react-router-dom";
import ratingWord from "../../utils/ratingWord";
import "./searchItem.css";

const SearchItem = ({ data, removeBtn }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/hotels/${id}`);
  };
  return (
    <div className="searchItem">
      <img
        className="siImg"
        src={
          data.photos[0] ||
          "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        }
        alt=""
      />
      <div className="siDesc">
        <h2 className="siTitle" onClick={() => handleClick(data._id)}>
          {data.name}
        </h2>
        <span className="siDistance">{data.distance}km from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{data.title}</span>
        <span className="siFeatures">{data.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="sicancelOpSubtitle">
          You can cancel later, so lock in this great deal.
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{ratingWord(data.rating)}</span>
          <button>{data.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${data.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          {!removeBtn && (
            <Link to={`/hotels/${data._id}`}>
              <button className="siCheckButton">See availability</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
