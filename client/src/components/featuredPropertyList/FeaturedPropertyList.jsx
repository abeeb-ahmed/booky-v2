import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ratingWord from "../../utils/ratingWord";
import "./featuredPropertyList.css";

const FeaturedPropertyList = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch(
    `https://booky-web-app.herokuapp.com/api/hotels?featured=true&limit=4`
  );
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="fpList">
          {data.map((item) => {
            return (
              <div
                className="fpListItem"
                key={item._id}
                onClick={() => navigate(`/hotels/${item._id}`)}
              >
                <img src={item.photos[0]} alt="" />
                <div className="fpListText">
                  <h2>{item.name}</h2>
                  <span>{item.city}</span>
                  <p>Starting from ${item.cheapestPrice}</p>
                </div>
                {item.rating && (
                  <div className="fpListRating">
                    <span>{item.rating}</span>
                    <span>{ratingWord(item.rating)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default FeaturedPropertyList;
