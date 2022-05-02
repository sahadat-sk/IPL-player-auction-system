import express from "express";
const router = express.Router();
import { createUser, authUser } from "../controllers/userControllers.js";

router.get("/", (req, res) => {
    res.send("HELLO WORDL");
});
router.post("/signup", createUser);
router.post("/login", authUser);

export default router;
