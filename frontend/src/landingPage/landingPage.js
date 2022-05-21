import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";
const landingPage = () => {
    return (
        <>
            <div className="landing-page">
                <div className="title">IPL Player auction system</div>
                <div className="auth">
                    <Link to="/signup">
                        <div className="button">signup</div>
                    </Link>
                    <Link to="/login">
                        <div className="button">login</div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default landingPage;
