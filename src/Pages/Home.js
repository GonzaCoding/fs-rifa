import React , {useState, useEffect} from 'react';
import firebase from '../Config/firebase';
import UltimasRifas from '../Components/UltimasRifas';
import Slogan from '../Components/Slogan';
import { Container } from 'react-bootstrap';


const Home = () => {
 
    return (
        <section>
            <Slogan />
            <UltimasRifas />
            
        </section>
                
    );
}

export default Home;

//<h2>Grilla de {numeros} números</h2>
//<Grilla numeros={numeros} idRifa="rifa1" />