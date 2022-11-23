import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// create hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// update hotel
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// delete hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

// get hotel
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// get hotels
export const getHotels = async (req, res, next) => {
  const { min, max, city, type, ...others } = req.query;

  try {
    const hotels = await Hotel.find({
      ...others,
      city: {
        $regex: city || "", // remove case sensitivity in query
        $options: "i" || "",
      },
      type: {
        $regex: type || "", // remove case sensitivity in query
        $options: "i" || "",
      },
      cheapestPrice: { $gte: min || 1, $lte: max || 1000000000000000 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// get number of hotels by city
export const countByCity = async (req, res, next) => {
  const list = req.query.cities.split(",");
  try {
    const cityCount = await Promise.all(
      list.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(cityCount);
  } catch (error) {
    next(error);
  }
};

// get number of hotels by type
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({
      type: { $regex: "hotel", $options: "i" },
    });
    const apartmentCount = await Hotel.countDocuments({
      type: { $regex: "apartment", $options: "i" },
    });
    const resortCount = await Hotel.countDocuments({
      type: { $regex: "resort", $options: "i" },
    });
    const villaCount = await Hotel.countDocuments({
      type: { $regex: "villa", $options: "i" },
    });
    const cabinCount = await Hotel.countDocuments({
      type: { $regex: "cabin", $options: "i" },
    });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
