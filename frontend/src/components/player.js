import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./player.css";
const socket = io("http://127.0.0.1:5000");

const Player = ({ name, inprice, id }) => {
    const [price, setPrice] = useState(inprice);
    const clickHandler = () => {
        //console.log(price);
        socket.emit("bid", { price, id });
        const newPrice = price + 100;
        setPrice(newPrice);
        axios.put("/mainpage", { id, price: newPrice });
    };
    useEffect(() => {
        socket.on("bid_inc", (data) => {
            // console.log(data);
            if (data.id === id) {
                setPrice(data.price + 100);
            }
        });
    }, [id]);

    return (
        <div className="player-card">
            <div className="name cditem">{name}</div>
            <div className="curr-price cditem">Current Price(lack) : <br/>{price}</div>
            <button className="bid cditem" onClick={clickHandler}>
                Bid on {name}
            </button>
        </div>
    );
};

export default Player;
