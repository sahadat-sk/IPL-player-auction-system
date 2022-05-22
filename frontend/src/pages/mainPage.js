import React, { useEffect } from "react";
import "./singupPage.css";
import io from "socket.io-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const socket = io("http://127.0.0.1:5000");

const MainPage = () => {
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();

    const clickHandler = () => {
        console.log(price);
        socket.emit("bid", {price});
        setPrice(price + 100);
    };

    useEffect(() => {
        console.log("changing")
        socket.on("bid_inc", (data) => {
            console.log(data);
            setPrice(data.price);
        });
    }, [socket]);

    return (
        <div className="main">
            <div
                className="button"
                onClick={() => {
                    localStorage.removeItem("userInfo");
                    navigate("/");
                }}
            >
                logout
            </div>
            <div className="players">
                <div className="player-card">
                    <div className="name">dhoni</div>
                    <div className="curr-price">{price}</div>
                    <button className="bid" onClick={clickHandler}>
                        bid on this player
                    </button>
                </div>
                <div className="player-card">
                    <div className="name">kohli</div>
                    <div className="curr-price">5</div>
                    <button className="bid" onClick={clickHandler}>
                        bid on this player
                    </button>
                </div>
                <div className="player-card">
                    <div className="name">idk</div>
                    <div className="curr-price">10000</div>
                    <button className="bid" onClick={clickHandler}>
                        bid on this player
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
