import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./landingpage.css";
const landingPage = () => {
    return (
        <>
            <div className="landing-page">
                <Link to="/login">
                    <Button variant="primary" size="lg">
                        LOG IN
                    </Button>{" "}
                </Link>
                <Link to="/signup">
                    <Button variant="outline-primary" size="lg">
                        SIGN UP
                    </Button>{" "}
                </Link>
            </div>
        </>
    );
};

export default landingPage;
