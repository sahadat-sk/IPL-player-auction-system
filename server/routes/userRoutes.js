import express from "express";
const router = express.Router();
import { createUser, authUser } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authmiddleware.js";
router.get("/", (req, res) => {
    res.send("hey");
});
router.post("/signup", createUser);
router.post("/login", authUser);
// router.get("/mainpage",protect, (req, res) => {
//     console.log("in the mainpage route")
//     res.send("hello");
// });

export default router;
