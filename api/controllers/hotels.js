import Hotel from "../models/Hotel.js";

// create hotel
export const createHotel = async (req, res, next) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// update hotel
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

// get hotels
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// get hotel
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// delete hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    next(error);
  }
};
