import React , {useState, useEffect} from 'react';
import firebase from '../Config/firebase';
import ItemRifa from '../Components/ItemRifa';


const Home = () => {
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
        <section className="Home">
            <h1>Rifas creadas:</h1>
            {rifas.map( (rifa) =>
                <ItemRifa key={rifa.id} rifa={rifa} />
            )}
        </section>
                
    );
}

export default Home;

//<h2>Grilla de {numeros} números</h2>
//<Grilla numeros={numeros} idRifa="rifa1" />