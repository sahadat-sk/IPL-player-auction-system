import React from "react";
import { Button } from "react-bootstrap";
import "./landingpage.css";
const landingPage = () => {
    return (
        <>
            <div className="landing-page">
                <Button variant="primary" size="lg">
                    LOG IN
                </Button>{" "}
                <Button variant="outline-primary" size="lg">
                    SIGN UP
                </Button>{" "}
            </div>
        </>
    );
};

export default landingPage;
