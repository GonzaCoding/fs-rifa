import React, { useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../Config/firebase';

const Logout = () => {

    useEffect(()=>{
        firebase.auth.signOut();
    },[]);
    
    return (
        <section>
            <Alert variant='success'>
                ¡Gracias por utilizar nuestro sistema!
            </Alert>
            <Button as={Link} to={"/home"} variant="primary">Ir al inicio</Button>&nbsp;
            <Button as={Link} to={"/login"} variant="primary">¡Ingresar!</Button>&nbsp;
            <Button as={Link} to={"/registro"} variant="primary">¡Registrarse!</Button>
        </section>
    )
}

export default Logout;