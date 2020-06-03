import React , {useState, useEffect} from 'react';
import Grilla from '../Components/Grilla/';
//import firebase from '../Config/firebase';


const Home = () => {
    const [numeros, setNumeros] = useState();
    
    useEffect(()=>{
        //console.log("home montado");
        // Add a new document in collection "cities"
        /*firebase.db.collection("rifas").doc("rifa1").set({
            numeros: recibido
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });*/
        setNumeros(20);
    },[])  
    
    return (
        <section className="Home">
            <h1>Home</h1>
            <h2>Grilla de {numeros} números</h2>
            <Grilla numeros={numeros} idRifa="rifa1" />
        </section>
                
    );
}

export default Home;