import React from 'react';
import './Numero.css';
import { Button } from 'react-bootstrap';
import { RifaConsumer } from '../Rifa';

const Numero = (props) => {
    

    return(
        <RifaConsumer>
            {({ numeros, setEstado})=>(
                <Button onClick={()=> {setEstado(props.valor)}} variant={props.tipo}>{props.valor}</Button>
            )}
        </RifaConsumer>
        
    ); 
}

export default Numero;