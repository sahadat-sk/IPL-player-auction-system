import React, { useEffect } from "react";
import "./singupPage.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "../components/player.js";
import axios from "axios";

//const socket = io("http://127.0.0.1:5000");

const MainPage = () => {
    const [players, setPlayers] = useState([]);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("userInfo")) {
            console.log(" inside if ..");
            navigate("/login");
        }
        const players = async () => {
            const { data } = await axios.get("/mainpage");
            setPlayers(data);
        };
        const info = JSON.parse(localStorage.getItem("userInfo"));
        setUserId(info.id);
        setUserName(info.teamName);
        players();
    }, [navigate]);

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
                {/* <Player name="dhoni" inprice={10} id="1"></Player>
                <Player name="kohli" inprice={5} id="2"></Player>
                <Player name="ami" inprice={1000} id="3"></Player> */}
                {players.map((player) => {
                    return (
                        <Player
                            key={player.uniqueId}
                            name={player.name}
                            inprice={player.current_price}
                            id={player._id}
                            userId={userId}
                            userName={userName}
                        ></Player>
                    );
                })}
            </div>
        </div>
    );
};

export default MainPage;
