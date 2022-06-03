import React, { useEffect } from "react";
import "./singupPage.css";
import io from "socket.io-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "../components/player";

const socket = io("http://127.0.0.1:5000");

const MainPage = () => {
   // const [price, setPrice] = useState(0);
    const navigate = useNavigate();

    

    useEffect(() => {
        if (!localStorage.getItem("userInfo")) {
            console.log(" inside if ..");
            navigate("/login");
        }
    }, [navigate]);

    // useEffect(() => {
    //     console.log("changing");
    //     socket.on("bid_inc", (data) => {
    //         console.log(data);
    //         setPrice(data.price);
    //     });
    // }, []);

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
                <Player name="dhoni" inprice={10} id="1"></Player>
                <Player name="kohli" inprice={5} id="2"></Player>
                <Player name="ami" inprice={1000} id="3"></Player>
            </div>
        </div>
    );
};

export default MainPage;
