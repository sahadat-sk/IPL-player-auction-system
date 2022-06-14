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
    const [renderTimer, setRenderTimer] = useState(false);

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

        socket.on("start_timer", (data) => {
            if (data.id === id) {
                if (!renderTimer) {
                    setRenderTimer(true);
                }
            }
        });

        socket.on("timeout", (data) => {
            setIsExpired(true);
            setRenderTimer(false);
        });
    }, [id]);
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60);

    return (
        <div className="player-card">
            {renderTimer && (
                <div>
                    {renderTimer && <Timer expiryTimestamp={time} id={id} />}

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
            {!renderTimer && (
                <div>
                    <div className="name cditem">{name}</div>
                    <div className="curr-price cditem">
                        Base Price : {price}
                    </div>
                    <br />
                    <div className="name cditem">
                        auction for this player will start soon
                    </div>
                </div>
            )}
        </div>
    );
};

export default Player;
