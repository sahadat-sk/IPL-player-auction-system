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
    const [isSold, setIsSold] = useState(curr_owner === "none" ? false : true);
    const [owner, setOwner] = useState(curr_owner);
    const [isExpired, setIsExpired] = useState(false);
    const [renderTimer, setRenderTimer] = useState(false);

    const clickHandler = async () => {
        //console.log(price);
        const currUserId = JSON.parse(localStorage.getItem("userInfo")).id;
        console.log(localStorage.getItem("userInfo"));
        const user = await axios.get("/user/" + currUserId);
        if (user.data.currentMoney <= price)
            console.log("NOT ENOUGH MONEY", user.data.currentMoney);
        if (userName !== owner && user.data.currentMoney >= price) {
            //console.log("userData is ", user.data);
            socket.emit("bid", { price, id });
            const newPrice = price + 100;
            setPrice(newPrice);

            const { data } = await axios.put("/mainpage", {
                id,
                price: newPrice,
                userId,
                userName,
                prevUserId: curr_owner,
            });

            setIsSold(true);

            setOwner(userName);
            socket.emit("current_owner", { owner: userName, id });
        }
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
            if (data.id === id) {
                setIsExpired(true);
                setRenderTimer(false);
            }
        });
    }, [id, renderTimer]);
    const time = new Date();
    time.setSeconds(time.getSeconds() + 6000);

    return (
        <div className="player-card pl-blur ">
            {renderTimer && (
                <div>

                    <div className="name cditem">{name}</div>
                    {renderTimer && <Timer expiryTimestamp={time} id={id} />}

                    <div className="owner cditem">current bidder {owner}</div>
                    <div className="curr-price cditem">
                        Current Price<br />
                        <div className="price">{price} lacs</div>
                    </div>
                    <button className="button bid-button" onClick={clickHandler}>
                        Bid 
                    </button>
                </div>
            )}
            {!renderTimer && isSold && (
                <div>
                    <div className="name cditem">{name}</div>
                    <div className="curr-price cditem">
                        Player sold for <br />
                        <div className="price">{price} lacs</div>
                    </div>
                    <br />
                    <div className="cditem">
                        Sold to
                        <div className="price">{owner}</div>
                    </div>
                </div>
            )}
            {!renderTimer && !isExpired && !isSold && (
                <div>
                    <div className="name cditem">{name}</div>
                    <div className="curr-price cditem">
                        Base Price <br />
                        <div className="price">{price} lacs</div>
                    </div>
                    <br />
                    <div className="cditem">
                        auction for this player will start soon
                    </div>
                </div>
            )}

            {!renderTimer && !isSold && isExpired && (
                <div>
                    <div className="name cditem">{name}</div>
                    <div className="curr-price cditem">
                        Base Price : {price}
                    </div>
                    <br />
                    {isExpired && (
                        <div className="cditem">The player was unsold</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Player;
