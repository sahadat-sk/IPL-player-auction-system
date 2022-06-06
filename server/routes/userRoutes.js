import express from "express";
const router = express.Router();
import { createUser, authUser } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authmiddleware.js";
import {playerController,playerUpdater} from "../controllers/playerController.js";

router.get("/", (req, res) => {
    res.send("hey");
});
router.post("/signup", createUser);
router.post("/login", authUser);
router.get("/mainpage", playerController);
router.put("/mainpage", playerUpdater);

export default router;
