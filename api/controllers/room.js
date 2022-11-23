import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// create room
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });

    res.status(200).json("Room created");
  } catch (error) {
    next(error);
  }
};

// update room
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

// delete room
export const deleteRoom = async (req, res, next) => {
  // const hotelId = req.params.hotelId;
  // try {
  //   await Room.findByIdAndDelete(req.params.id);
  //   await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
  //   res.status(200).json("Room has been deleted.");
  // } catch (error) {
  //   next(error);
  // }
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room deleted");
  } catch (error) {
    next(error);
  }
};

// get room
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

// get rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

// update room numbers
export const updateRoomAvailablility = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: { "roomNumbers.$.unavailableDates": req.body.dates },
      }
    );
    res.status(200).json("Room status has been updated");
  } catch (error) {
    next(error);
  }
};
