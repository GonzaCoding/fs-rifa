import React, { useEffect, useState } from 'react';
import Rifa from '../Components/Rifa';
import firebase from '../Config/firebase';
import Loading from '../Components/Loading';

const Participar = (props) => {

    const [contenido,setContenido] = useState();
    const [isLoaded,setLoaded] = useState(false);

    useEffect(()=>{
        //console.log(props);
        firebase.db.collection("rifas").doc(props.match.params.id)
        .get().then(function(doc) {
            if (doc.exists) {
                //console.log("Document data:", doc.data());
                setContenido(doc.data().contenido);
                setLoaded(true);
            } else {
                console.log("No se encuentra rifa!");
            }
        }).catch(function(error) {
            console.log("Error obteniendo rifa:", error);
        });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(!isLoaded){
        return <Loading />;
    } else {
        return(
            <>
                <h1>Participando en el sorteo:</h1>
                <h2>{contenido.nombre}</h2>
                <p>{contenido.descripción}</p>
                <p>Termina: {contenido.fecha}</p>
                <Rifa idRifa={props.match.params.id} />
            </>
        )
    }
}

export default Participar;
