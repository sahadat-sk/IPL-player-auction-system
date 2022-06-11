import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:5000");

const MyTimer = ({ expiryTimestamp, id, userId, userName }) => {
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
            socket.emit("exp", { id, userId, userName });
        },
    });
    
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", color: "whitesmoke" }}>
                {isRunning && (
                    <div>
                        <span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default MyTimer;
