import React from "react";
import "./singupPage.css";
import io from "socket.io-client";
import { useState } from "react";
const socket = io("http://localhost:5000");

const MainPage = () => {
    let [price, setPrice] = useState("");
    price = 100;
    const clickHandler = () => {
        socket.emit("bid", { price });
        price += 100;
    };
    return (
        <div className="main">
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
