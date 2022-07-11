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
    isRunning,
}) => {
    const [price, setPrice] = useState(inprice);
    const [isSold, setIsSold] = useState(curr_owner === "none" ? false : true);
    const [owner, setOwner] = useState(curr_owner);
    const [isExpired, setIsExpired] = useState(false);
    const [renderTimer, setRenderTimer] = useState(isRunning);
    const [time, setTime] = useState(Date.parse(timeLeft));

    //console.log("timeLeft is ", Date.parse(timeLeft));
    const clickHandler = async () => {
        //console.log(price);

        //method 1 #refresh does not work
        // const currUserId = JSON.parse(localStorage.getItem("userInfo")).id;
        // const currMoney = JSON.parse(
        //     localStorage.getItem("userInfo")
        // ).currentMoney;
        // console.log(currMoney);

        //not logical
        // let user = null;
        // if (currMoney >= price) {
        //      user = await axios.get("/user/" + currUserId);
        //      localStorage.setItem("userInfo", JSON.stringify(user.data));
        // }else {
        //     alert("You don't have enough money");
        //     return;
        // }
        // if (user.data.currentMoney <= price)
        //     console.log("NOT ENOUGH MONEY", user.data.currentMoney);

        let {data} = await axios.get("/user/" + userId);
        //console.log("User is",data.currentMoney);
        let currMoney = data.currentMoney;
        //currMoney = 100000; //for testing
        if (userName !== owner && currMoney >= price) {
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
            // let user = JSON.parse(localStorage.getItem("userInfo"));
            // user.currMoney = user.currentMoney - price;
            // localStorage.setItem("userInfo", JSON.stringify(user));

            setOwner(userName);
            socket.emit("current_owner", { owner: userName, id });
            console.log("current Money", currMoney, price);
            socket.emit("change_user_money", {
                id: userId,
                price: currMoney - price,
            });
            socket.emit("change_prev_user_money",{id:owner,price:price-100});
        }
    };
    useEffect(() => {
        // if (!isExpired) {
        //     setRenderTimer(true);
        // }else{
        //     setRenderTimer(false);
        // }
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
                    let time = data.timeLeft;
                   // console.log("time Left : ", Date.parse(time));
                    //time.setSeconds(time.getSeconds() + 600);
                    //console.log("time Left 2 : ", time);

                    setTime(Date.parse(time));
                }
            }
        });

        socket.on("timeout", (data) => {
            if (data.id === id) {
                setIsExpired(true);
                setRenderTimer(false);
            }
        });
        // socket.on("change_money", (data) => {
        //     console.log("data is ",data);
        //     if (data.id === id) {
        //         console.log(data);
        //         setPrice(data.price);
        //         let user = JSON.parse(localStorage.getItem("userInfo"));
        //         user.currMoney = data.price;
        //         localStorage.setItem("userInfo", JSON.stringify(user));
        //     }
        // })
    }, [id, renderTimer]);
    // const time = new Date();
    // time.setSeconds(time.getSeconds() + 6000);

    return (
        <div className="player-card pl-blur ">
            {renderTimer && (
                <div>
                    <div className="name cditem">{name}</div>
                    {renderTimer && (
                        <Timer
                            expiryTimestamp={time}
                            id={id}
                            owner={owner}
                            price={price}
                            isSold={isSold}
                        />
                    )}

                    <div className="owner cditem">current bidder {owner}</div>
                    <div className="curr-price cditem">
                        Current Price
                        <br />
                        <div className="price">{price} lacs</div>
                    </div>
                    <button
                        className="button bid-button"
                        onClick={clickHandler}
                    >
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
