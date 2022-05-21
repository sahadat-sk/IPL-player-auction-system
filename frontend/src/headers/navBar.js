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
                        
                            <Nav.Link >
                                <Link to="/">
                                Home
                                </Link>
                                
                                </Nav.Link>
                        
                        <Nav.Link>Features</Nav.Link>
                        <Nav.Link>Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default navBar;
