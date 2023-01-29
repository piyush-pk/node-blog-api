import express from "express";
import {
  register,
  login,
  logout,
  profile,
  updateUser,
} from "../controller/user.js";
import { getUserById } from "../middlewares/user.js";
import { isSingedIn, isAunthenticated, isAdmin } from "../middlewares/auth.js";

// router
const router = express.Router();

router.param("userId", getUserById);

router.get("/:userId", isSingedIn, isAunthenticated, profile);
router.put("/:userId", isSingedIn, isAunthenticated, updateUser);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export const userRouter = router;
