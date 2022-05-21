import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import connectDb from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import { Server } from "socket.io";
import cors from "cors";
//connecting to the databse
connectDb();

const app = express();
app.use(express.json()); // to read json data

app.use(userRouter);

const server = app.listen(process.env.PORT_NO, () => {
    console.log(`listining to port ${process.env.PORT_NO}`);
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
io.on("connection", (socket) => {
    console.log(`connected to socket.io with ${socket.id}`);
    socket.on("bid", (data) => {
        console.log(data);
    });
});
