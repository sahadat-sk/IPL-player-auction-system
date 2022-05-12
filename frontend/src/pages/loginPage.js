import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./singupPage.css";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = axios.post(
                "/signup",
                {
                    teamName: username,
                    password,
                },
                config
            );
        } catch (error) {}
    };
    return (
        <>
            <div className="card-container">
                <Card style={{ width: "20rem" }}>
                    <Card.Body>
                        <Card.Title>Signup</Card.Title>
                        <Form onSubmit={submitHandler}>
                            <Form.Group
                                className="mb-3"
                                controlId="formGroupEmail"
                            >
                                <Form.Label>user name</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="Enter user name"
                                    value={username}
                                    onChange={(e) =>
                                        setusername(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formGroupPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setpassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Signup
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};

export default LoginPage;
