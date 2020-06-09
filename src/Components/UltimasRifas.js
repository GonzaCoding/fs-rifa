import React , {useState, useEffect} from 'react';
import firebase from '../Config/firebase';
import ItemRifa from '../Components/ItemRifa';
import { Container } from 'react-bootstrap';


const UltimasRifas = (props) => {
    const [rifas, setRifas] = useState([]);
    
    useEffect(()=>{
         
        firebase.db.collection("rifas").get().then(function(querySnapshot) {
            let leidas = [];
            querySnapshot.forEach(function(doc) {
                leidas.push({
                    id: doc.id,
                    nombre: doc.data().contenido.nombre,
                    descripcion: doc.data().contenido.descripcion
                })
            });
            setRifas(leidas);
        });
        
    },[])  
        
    return (
        <section>
            <h3>Últimas Rifas:</h3>
            <Container className="contenedor-rifa">
                {rifas.map( (rifa) =>
                    <ItemRifa key={rifa.id} rifa={rifa} />
                )}
            </Container>
        </section>
                
    );
}

export default UltimasRifas;