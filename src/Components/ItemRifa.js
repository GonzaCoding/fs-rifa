import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemRifaStyle = {
    border: "1px solid black",
    borderRadius: "5px",
    boxShadow: "2px 2px 2px grey",
    padding: "15px",
    margin: "20px",
    overflow: "hidden"
}

const ItemRifa = (props) => (
    <div style={ItemRifaStyle}>
        <h2>{props.rifa.nombre}</h2>
        <p>{props.rifa.descripcion}</p>
        <Button as={Link} to={"/participar/"+props.rifa.id} variant="primary"><span role="img" aria-label="Music">🎼</span> Participar</Button>&nbsp;
    </div>
);

export default ItemRifa;