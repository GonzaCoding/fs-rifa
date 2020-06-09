import React, { useState, useEffect } from 'react';
import './Rifa.css';
import { Button, Container, Alert, Row, Col } from 'react-bootstrap';
import Loading from '../Loading';
import firebase from '../../Config/firebase';

const Rifa = (props) => {
    
    const [ isLoaded, setIsLoaded] = useState(false);
    const [ numeros, setNumeros] = useState([]);
    const [ user, setUser] = useState();
    //var usuario = ;

    const ESTADOS = {
        disponible: 0,
        seleccionado: 1,
        pagado: 2,
        reservado: 3,
        otro: 4,
        btnStyle: ["success", "primary","secondary","warning","danger"],
        toString: ["disponible", "seleccionado", "comprado", "reservado","comprado"]
    }
    
    const cambiarEstado = (num) => {  
        //console.log("clickeado: " + num + " y pasa a estado: " + est);
        let clickeado = numeros.find(x => x.valor === num);
        let index = numeros.indexOf(clickeado);
        //console.log("el indice del clickeado es: " +index);
        
        //si está disponible o reservado a mi nombre
        if((numeros[index].estado === ESTADOS.disponible ) || (numeros[index].estado === ESTADOS.seleccionado && numeros[index].usuario === user.uid)){
            let nums = [...numeros];
            let nuevo_estado = numeros[index].estado === ESTADOS.disponible ? ESTADOS.seleccionado : ESTADOS.disponible;
            let nuevo_user = numeros[index].estado === ESTADOS.disponible ? user.uid : '';

            let nuevo = {
                ...nums[index],
                estado: nuevo_estado ,
                usuario: nuevo_user
            }
            nums[index]=nuevo;
            
            actualizarEstadoYBD(nums);
            
        } else {
            let mensaje = `Número ${ESTADOS.toString[numeros[index].estado]}`;
            if(numeros[index].usuario === user.uid){
                mensaje+=" por tu usuario";
            } else {
                mensaje+=" por otro usuario";
            }
            alert(mensaje);
        }
        
    }

    const actualizarEstadoYBD = (nums) => {
        //actualizar estado
        setNumeros(nums);

        //actualizar BD
        firebase.db.collection("rifas").doc(props.idRifa)
        .update({
            numeros: nums
        })
        .then(()=>{
            //console.log("rifa actualizada");
        })
        .catch((error)=>{
            console.error("Error updating document: ", error);
        });
    }

    useEffect(()=>{
        
        //console.log("ejecutado useeffect de " + props.idRifa);
        //console.log(usuario);
        if (firebase.auth.currentUser){
            setUser(firebase.auth.currentUser)
        }else {
            setUser({
                uid: 'anonimo'
            })
        }     
        

        //3. escuchar cambios
        firebase.db.collection("rifas").doc(props.idRifa)
        .onSnapshot(function(doc) {
            // muestra si es un evento local o del server:
            // console.log(doc.metadata.hasPendingWrites ? "Local" : "Server");
            // console.log(doc.data());
            setNumeros(doc.data().numeros);
            setIsLoaded(true);
         }, function(error) {
            console.log(error);
         });
        //setUser('usuario1');
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const comprar = () => {
        let nums = [...numeros];
        numeros.forEach((value, index)=>{
            if(value.estado === ESTADOS.seleccionado && value.usuario === user.uid) {
                //console.log(value);
                
                let nuevo = {
                    ...nums[index],
                    estado: ESTADOS.pagado,
                    usuario: user.uid
                }
                nums[index]=nuevo;
            }
        });
        actualizarEstadoYBD(nums);
        
        return true;
    }
        
    if(!isLoaded){
        return <Loading />;
    } else {
               
        return(
            <>
                <Button variant="outline-secondary" onClick={comprar}>Comprar</Button>
                
                <Container>
                    <hr/>
                    <Container>
                        <Row md={5}>
                            <Col as={Button} size="sm" variant="success">Disponible</Col>
                            <Col as={Button} size="sm" variant="primary">Seleccionaste</Col>
                            <Col as={Button} size="sm" variant="secondary">Compraste</Col>
                            <Col as={Button} size="sm" variant="warning">Reservado</Col>
                            <Col as={Button} size="sm" variant="danger">Comprado</Col>
                        </Row>
                    </Container>
                        
                    
                    <hr/>
                    
                    <div className="grilla">
                    { numeros &&
                        numeros.map((value, index)=>{
                            let tipoBtn = ESTADOS.btnStyle[value.estado];
                            //si está seleccionado por otro usuario
                            if (value.estado=== ESTADOS.seleccionado && value.usuario !== user.uid){
                                tipoBtn = ESTADOS.btnStyle[ESTADOS.reservado]
                            } else if (value.estado=== ESTADOS.pagado && value.usuario !== user.uid){
                                tipoBtn = ESTADOS.btnStyle[ESTADOS.otro]
                            }
                            return (
                                <Button key={"btn"+value.valor} onClick={()=> {cambiarEstado(value.valor)}} variant={tipoBtn}>{value.valor}</Button>               
                            )
                        }) 
                    }
                    </div>
                </Container>
            </>
        );
    }
    
}

export default Rifa;

