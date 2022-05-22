import React, { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./singupPage.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
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
                "/signup",
                {
                    teamName: username,
                    password,
                },
                config
            );
            localStorage.setItem("userInfo",JSON.stringify(data));
            navigate("/mainpage");
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className="main">
            <form className="card-container" onSubmit={submitHandler}>
                <h1 className="form-heading">SIGN UP</h1>
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
                <input className="button" type="submit" value="signup" />
            </form>
        </div>
    );
};

export default SignupPage;
