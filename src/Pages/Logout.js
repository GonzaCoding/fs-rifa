import React, { useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../Config/firebase';

const Logout = () => {

    useEffect(()=>{
        firebase.auth.signOut();
    },[]);
    
    return (
        <div>
            <Alert variant='success'>
                ¡Gracias por utilizar nuestro sistema!
            </Alert>
            <Button as={Link} to={"/home"} variant="primary"><span role="img" aria-label="Music">🎼</span> Ir al inicio</Button>&nbsp;
            <Button as={Link} to={"/login"} variant="primary"><span role="img" aria-label="Mic">🎙</span> Ingresar</Button>&nbsp;
            <Button as={Link} to={"/registro"} variant="primary"><span role="img" aria-label="Figures">🎶</span> Crear cuenta</Button>
        </div>
    )
}

export default Logout;