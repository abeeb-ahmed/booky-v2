import { Router } from "express";
import { login, registerUser } from "../controllers/auth.js";

const router = Router();

// Register user route
router.post("/register", registerUser);

// login user
router.post("/login", login);

export default router;
