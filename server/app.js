import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import connectDb from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import { Server } from "socket.io";
import cors from "cors";
import { updateTime } from "./controllers/playerController.js";
import {
    updateUserMoney,
    updCurrMoney,
    updPrevCurrMoney,
} from "./controllers/userControllers.js";
//connecting to the databse
connectDb();

const app = express();
app.use(express.json()); // to read json data
app.use(
    cors({
        origin: "*",
    })
);

app.use(userRouter);

const server = app.listen(process.env.PORT_NO, () => {
    console.log(`listining to port ${process.env.PORT_NO}`);
});

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    //console.log(`connected to socket.io with ${socket.id}`);
    socket.on("bid", (data) => {
        //console.log(data);
        socket.broadcast.emit("bid_inc", data);
    });
    socket.on("exp", (data) => {
        //console.log(data);
        async function updateMoney() {
            await updateUserMoney(data.userId, data.price);
        }
        if (data.isSold) {
            let newMoney = updateMoney();
            socket.broadcast.emit("change_money", {
                newMoney,
                userId: data.userId,
            });
        }
        socket.broadcast.emit("timeout", data);
    });
    socket.on("curr_time", (time) => {
        socket.broadcast.emit("change_curr_time", time);
    });
    socket.on("current_owner", (owner) => {
        //console.log("current owner",owner);
        socket.broadcast.emit("change_current_owner", owner);
    });
    socket.on("start_auction", (data) => {
        //update time id db
        async function updTime() {
            await updateTime(data.id, data.timeLeft);
        }
        //console.log(data.timeLeft+60);
        updTime();
        socket.broadcast.emit("start_timer", data);
    });
    socket.on("change_user_money", (data) => {
        //console.log(data);
        async function updMoney() {
            await updCurrMoney(data.id, data.price);
        }
        updMoney();
        socket.broadcast.emit("change_money", data);
    });
    socket.on("change_prev_user_money", (data) => {
        //console.log(data);
        let id = null;
        async function updMoney() {
            await updPrevCurrMoney(data.id, data.price);
        }
        updMoney();

        console.log("id is ", data);
        socket.broadcast.emit("change_money", data);
    });
});
