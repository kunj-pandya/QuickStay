import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserData, storeRecentSerachedCities } from "../controllers/userController.js";
// import { getUserData, storeRecentSerachedCities } from "../controllers/userController";


const userRouter = express.Router();

userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storeRecentSerachedCities);

export default userRouter;

