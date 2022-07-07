import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:5000");

const MyTimer = ({ expiryTimestamp,id ,owner,price,isSold}) => {
    const [sec,setSec] = useState(0);
    const [min,setMin] = useState(0);
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            socket.emit("exp", {id,owner,price,isSold});
            //socket.emit("reduce_money", {userId,price});
        },
    });
    useEffect(() => {
        // async function timeUpdater(){
            
        //     await axios.put("/mainpage/updtime", { id, sec:seconds, min:minutes });
        // }
        // if(seconds !== 0) {
        //     console.log(minutes);
        //     timeUpdater();
        // }
        // setInterval(() => {
        //     if (seconds !== 0) {
        //         tm();
        //     }
        //     async function tm(){
        //         let {data} = await axios.put("/mainpage/updtime", { id, sec: seconds, min: minutes });
        //         setMin(data.min);
        //         setSec(data.sec);
        //     }
        // }, 1000);
    }, []);
    
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", color: "whitesmoke" }}>
                {isRunning && (
                    <div>
                        <span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                )}
                {!isRunning && (
                    <span>timout</span>
                )}
            </div>
        </div>
    );
};
export default MyTimer;
