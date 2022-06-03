import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://127.0.0.1:5000");


const Player = ({name,inprice,id}) => {
    const [price, setPrice] = useState(inprice);
     const clickHandler = () => {
         console.log(price);
         socket.emit("bid", { price,id });
         setPrice(price + 100);
     };
     useEffect(() => {
            socket.on("bid_inc", (data) => {
                console.log(data);
                if(data.id === id){
                    setPrice(data.price+100);
                }

            });
        }, []);

    return (
        <div className="player-card">
            <div className="name">{name}</div>
            <div className="curr-price">{price}</div>
            <button className="bid" onClick={clickHandler}>
                bid on this player
            </button>
        </div>
    );
};

export default Player;
