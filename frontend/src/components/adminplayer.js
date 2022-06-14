import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./player.css";
import Timer from "./timer.js";
const socket = io("http://127.0.0.1:5000");

const Player = ({ name, inprice, id, curr_status }) => {
    const [price, setPrice] = useState(inprice);
    const [isSold, setIsSold] = useState(curr_status === "sold" ? true : false);

    const startAuctionHandler = ()=>{
        socket.emit("start_auction", { id });
    }

    return (
        <div className="player-card admin-player-card">
            <div className="name cditem">{name}</div>
            <div className="curr-price cditem">
                Current Price(lac) : <br />
                {price}
            </div>
            <div className="status cditem">{curr_status}</div>
            <button onClick={startAuctionHandler}>Start auction</button>
        </div>
    );
};

export default Player;
