import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const navBar = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <h1 className="nav">IPL BIDDER</h1>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/">
                            <Nav.Link>Home</Nav.Link>
                        </Link>
                        <Nav.Link>Features</Nav.Link>
                        <Nav.Link>Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default navBar;
