import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./singupPage.css";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            navigate("/mainpage");
        }
    }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/login",
                {
                    teamName: username,
                    password,
                },
                config
            );
            console.log("USER INFO IS:  ", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/mainpage");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="main">
            <form className="card-container" onSubmit={submitHandler}>
                <h1 className="form-heading">LOGIN</h1>
                <label className="form-label">
                    username:
                    <br />
                    <input
                        type="text"
                        name="name"
                        onChange={(e) => {
                            setusername(e.target.value);
                        }}
                    />
                </label>
                <label className="form-label">
                    password:
                    <br />
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                    />
                </label>
                <input className="button" type="submit" value="login" />
            </form>
        </div>
    );
};

export default LoginPage;
