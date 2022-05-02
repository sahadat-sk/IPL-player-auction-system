import express from "express";
import dotenv from "dotenv";
dotenv  .config({ path: "../.env" });
import connectDb from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
//connecting to the databse
connectDb();

const app = express();
app.use(express.json()); // to read json data

app.use(userRouter);

app.listen(process.env.PORT_NO, () => {
    console.log(`listining to port ${process.env.PORT_NO}`);
});
