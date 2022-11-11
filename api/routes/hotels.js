import { Router } from "express";

import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotels.js";

const router = Router();

// create hotel router
router.post("/", createHotel);
// get hotels
router.get("/", getHotels);
// get hotel
router.get("/:id", getHotel);
// update hotel
router.put("/:id", updateHotel);
// delete hotel
router.delete("/:id", deleteHotel);

export default router;
