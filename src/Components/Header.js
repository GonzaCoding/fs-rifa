import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import firebase from '../Config/firebase';

const Header = () => {
    const [ userData, setUserData ] = useState('');

    useEffect(()=>{
        firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                //console.log("usuario con uid:" + user.uid);
                firebase.db.collection("usuarios")
                    .where("uid","==",user.uid)
                    .get()
                    .then(query => {
                        query.forEach((d) => {
                            setUserData(d.data());
                        });
                    })
                    .catch(function(error) {
                        console.log("Error trayendo info del usuario:", error);
                    });               
            } else {
                // No user is signed in.
                setUserData('');
            }
        });
    },[]);

    return (
        <Navbar bg="primary" variant="dark" collapseOnSelect expand="sm" sticky="top" > 
            <Navbar.Brand as={Link} to="/home">
                <img
                    alt=""
                    src="../logo.png"
                    width="50"
                    height="50"
                    className="d-inline-block align-center"
                />{' '}
                FS rifa
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home"><span role="img" aria-label="Music">🎼</span> Inicio</Nav.Link>
                    { userData &&
                        <Nav.Link as={Link} to="/crear"><span role="img" aria-label="Music">🎼</span> Crear rifa</Nav.Link>
                    }
                </Nav>
                <Nav className="justify-content-end">
                {
                    !userData && 
                        <>
                                <Nav.Link as={Link} to="/login">🎙 Ingresar</Nav.Link>
                                <Nav.Link as={Link} to="/registro"><span role="img" aria-label="Figures">🎶</span> Crear cuenta</Nav.Link>
                        </>
                }
                {
                    userData &&
                        <>
                            <NavDropdown drop="left" title={"🎵 "+userData.username} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/miperfil"><span role="img" aria-label="Guitarra">🎸</span> Mi perfil</NavDropdown.Item>
                            <NavDropdown.Item href="#"><span role="img" aria-label="Saxo">🎷</span> Mis rifas</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/logout"><span role="img" aria-label="Audifono">🎧</span> Cerrar sesión</NavDropdown.Item>
                            </NavDropdown>
                        </>
                }
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;