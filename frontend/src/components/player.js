import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./player.css";
import Timer from "./timer.js";
const socket = io("http://127.0.0.1:5000");

const Player = ({ name, inprice, id, userId, userName }) => {
    const [price, setPrice] = useState(inprice);
    const [isSold, setIsSold] = useState(false);
    const [owner, setOwner] = useState("");
    const [isExpired, setIsExpired] = useState(false);

    const clickHandler = async () => {
        //console.log(price);
        socket.emit("bid", { price, id });
        const newPrice = price + 100;
        setPrice(newPrice);
        setOwner(userName);
        setIsSold(true);
        await axios.put("/mainpage", { id, price: newPrice, userId, userName });
    };
    useEffect(() => {
        socket.on("bid_inc", (data) => {
            // console.log(data);
            if (data.id === id) {
                setPrice(data.price + 100);
            }
        });
        socket.on("player_exp", (data) => {
            if (data.id === id) {
                setIsExpired(true);
            }
        });
    }, [id]);
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60);

    return (
        <div className="player-card">
            {!isExpired && (
                <div>
                    <Timer
                        expiryTimestamp={time}
                        id={id}
                        userId={userId}
                        userName={userName}
                    />
                    <div className="name cditem">{name}</div>
                    <div className="curr-price cditem">
                        Current Price(lac) : <br />
                        {price}
                    </div>
                    <button className="bid cditem" onClick={clickHandler}>
                        Bid on {name}
                    </button>
                </div>
            )}
            {isExpired && (
                <div>
                    <div className="name cditem">{name}</div>
                    <div className="curr-price cditem">
                        sold to {owner} for {price} lacs
                    </div>
                </div>
            )}
        </div>
    );
};

export default Player;
