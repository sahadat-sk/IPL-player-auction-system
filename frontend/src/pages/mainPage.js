import React from "react";
import "./singupPage.css";
import io from "socket.io-client";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
const socket = io("http://127.0.0.1:5000");

const MainPage = () => {
    const [price, setPrice] = useState(0);
    const clickHandler = () => {
        socket.emit("bid", { price });
        setPrice(price + 100);
    };
    const navigate = useNavigate();
    return (
        <div className="main">
            <div className="players">
                <div
                    className="button"
                    onClick={() => {
                        localStorage.removeItem("userItem");
                        navigate("/");
                    }}
                >
                    logout
                </div>
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
