import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../util/generateToken.js";

//for creating a new user
const createUser = asyncHandler(async (req, res) => {
    const { teamName, password, isAdmin } = req.body;

    const userExists = await User.findOne({ teamName });
    if (userExists) {
        throw new Error("user already exists");
    }
    const user = await User.create({
        teamName,
        password,
        isAdmin,
    });
    if (user) {
        res.status(201).json({
            id: user._id,
            teamName: user.teamName,
            password: user.password,
            isAdmin: user.isAdmin,
            currentMoney: user.currentMoney,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("user not found");
    }
});

// authenticate user while login
const authUser = asyncHandler(async (req, res) => {
    const { teamName, password } = req.body;

    let user = await User.findOne({ teamName });
    if (user && (await user.verify(password))) {
        res.status(201).json({
            id: user._id,
            teamName: user.teamName,
            password: user.password,
            currentMoney: user.currentMoney,
            token: generateToken(user._id),
        });
        console.log("user found");
    } else {
        res.status(400);

        throw new Error("USER NOT FOUND");
    }
});
export { createUser, authUser };
