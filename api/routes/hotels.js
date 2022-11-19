import express from "express";

import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels);

// GET HOTEL COUNT BY CITY
router.get("/countByCity", countByCity);

// GET HOTEL BY TYPE
router.get("/countByType", countByType);
export default router;

// GET HOTEL ROOMS
router.get("/rooms/:id", getHotelRooms);
