import React from 'react';
import './Numero.css';
import { Button } from 'react-bootstrap';
import { GrillaConsumer } from '../Grilla';

const Numero = (props) => {
    

    return(
        <GrillaConsumer>
            {({ numeros, setEstado})=>(
                <Button onClick={()=> {setEstado(props.valor)}} variant={props.tipo}>{props.valor}</Button>
            )}
        </GrillaConsumer>
        
    ); 
}

export default Numero;