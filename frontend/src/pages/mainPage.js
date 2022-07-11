import React, { useEffect } from "react";
import "./singupPage.css";
import Timer from "../components/timer.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Player from "../components/player.js";
import io from "socket.io-client";
import axios from "axios";
const socket = io("http://127.0.0.1:5000");

//const socket = io("http://127.0.0.1:5000");

const MainPage = () => {
    const [players, setPlayers] = useState([]);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [isRunning, setIsRunning] = useState(true);
    const [time, setTime] = useState(new Date().setSeconds(6000));
    const [currMoney, setCurrMoney] = useState(
        JSON.parse(localStorage.getItem("userInfo")).currentMoney
    );

    //time.setSeconds(time.getSeconds() + 60);

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("userInfo")) {
            console.log(" inside if ..");
            navigate("/login");
        }
        const players = async () => {
            let { data } = await axios.get("/mainpage");
            setPlayers(data);
            
        };
        const userMoney = async() =>{
            let { data } = await axios.get("/user/" + userId);
            setCurrMoney(data.currentMoney);
        }
        const info = JSON.parse(localStorage.getItem("userInfo"));
        setUserId(info.id);
        setUserName(info.teamName);
        userMoney();

        socket.emit("curr_time", { time });
        socket.on("change_curr_time", (data) => {
            if (isRunning) setTime(data.time);
            else setTime(0);
        });

        socket.on("timeout", (data) => {
            setIsRunning(false);
        });
        socket.on("change_money", (data) => {
            console.log("data is ", data);
            if (data.id === userId) {
                console.log("price to be set", data.price);
                setCurrMoney(data.price);
            } else if (data.id === userName) {
                //setCurrMoney(currMoney + data.price);
                userMoney();
            }
        });
        players();
    }, [navigate, isRunning, time]);

    // const time = new Date();

    return (
        <div className="main">
            <div className="heading blur ">
                <div className="title mp-heading">Available Players</div>
                <div
                    className="button mp-button"
                    onClick={() => {
                        localStorage.removeItem("userInfo");
                        navigate("/");
                    }}
                >
                    logout
                </div>
            </div>
            {/* <div
                className="playersBought"
                onClick={() => {
                    navigate("/playersBought");
                }}
            >
                My Players
            </div> */}
            <div className="currMoney ">Available money : {currMoney}</div>
            {/* <Timer expiryTimestamp={time} /> */}
            <div className="players">
                {/* <Player name="dhoni" inprice={10} id="1"></Player>
                <Player name="kohli" inprice={5} id="2"></Player>
                <Player name="ami" inprice={1000} id="3"></Player> */}
                {players.map((player) => {
                    //console.log(player.name, player.time_left);
                    return (
                        <Player
                            key={player.uniqueId}
                            name={player.name}
                            inprice={player.current_price}
                            id={player._id}
                            userId={userId}
                            userName={userName}
                            curr_owner={player.curr_owner}
                            timeLeft={player.expires_on}
                            isRunning={player.is_auc_running}
                        ></Player>
                    );
                })}
            </div>
        </div>
    );
};

export default MainPage;
