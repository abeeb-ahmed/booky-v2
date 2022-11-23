import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailablility,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = Router();

// CREATE ROOM
router.post("/:hotelId", createRoom);

//UPDATE
router.put("/:id", updateRoom);
router.put("/availability/:id", updateRoomAvailablility);

//DELETE
router.delete("/:id", deleteRoom);

//GET
router.get("/find/:id", getRoom);

//GET ALL
router.get("/", getRooms);

export default router;
