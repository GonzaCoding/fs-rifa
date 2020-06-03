import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="Footer">
        <Navbar bg="dark" variant="dark" collapseOnSelect expand="sm" sticky="bottom">
            <Navbar.Brand as={Link} to="/home">Desarrollado por FS-soft - &copy; 2020</Navbar.Brand>
        </Navbar>
    </footer>
);

export default Footer;