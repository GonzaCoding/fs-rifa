import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemRifaStyle = {
    border: "2px solid grey",
    borderRadius: "5px",
    boxShadow: "2px 2px 2px grey",
    padding: "15px",
    margin: "10px auto",
    overflow: "hidden",
    //maxWidth: "410px",
    minWidth: "420px",
    //flexGrow: 1
}

const ItemRifa = (props) => (
    <article style={ItemRifaStyle}>
        <h4>{props.rifa.nombre}</h4>
        <p>{props.rifa.descripcion}</p>
        <Button as={Link} to={"/participar/"+props.rifa.id} variant="primary">Participar</Button>&nbsp;
    </article>
);

export default ItemRifa;