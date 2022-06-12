import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./player.css";
import Timer from "./timer.js";
const socket = io("http://127.0.0.1:5000");

const Player = ({
    name,
    inprice,
    id,
    userId,
    userName,
    curr_owner,
    timeLeft,
}) => {
    const [price, setPrice] = useState(inprice);
    const [isSold, setIsSold] = useState(false);
    const [owner, setOwner] = useState(curr_owner);
    const [isExpired, setIsExpired] = useState(false);

    const clickHandler = async () => {
        //console.log(price);
        socket.emit("bid", { price, id });
        const newPrice = price + 100;
        setPrice(newPrice);
        setIsSold(true);
        const { data } = await axios.put("/mainpage", {
            id,
            price: newPrice,
            userId,
            userName,
            prevUserId: curr_owner,
        });
        console.log("player data", data);
        setOwner(userName);
        socket.emit("current_owner", { owner: userName, id });
    };
    useEffect(() => {
        socket.on("bid_inc", (data) => {
            // console.log(data);
            if (data.id === id) {
                setPrice(data.price + 100);
            }
        });

        socket.on("change_current_owner", (data) => {
            if (data.id === id) {
                setOwner(data.owner);
            }
        });

        socket.on("timeout", (data) => {
            setIsExpired(true);
        });
    }, [id]);
    const time = new Date();
    time.setSeconds(time.getSeconds() + timeLeft);

    return (
        <div className="player-card">
            {!isExpired && (
                <div>
                    {/* <Timer
                        expiryTimestamp={time}
                        id={id}
                        userId={userId}
                        userName={userName}
                    /> */}

                    <div className="name cditem">{name}</div>

                    <div className="name cditem">owner: {owner}</div>
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
