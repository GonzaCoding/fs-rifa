import React, { useState, useEffect } from 'react';
import './Grilla.css';
import { Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import Numero from '../Numero';
import Loading from '../Loading';
import firebase from '../../Config/firebase';

const { Provider, Consumer } = React.createContext();

const Grilla = (props) => {
    
    const [ isLoaded, setIsLoaded] = useState(false);
    const [ numeros, setNumeros] = useState([]);
    const [ user, setUser] = useState('');
    
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
        if((numeros[index].estado === ESTADOS.disponible ) || (numeros[index].estado === ESTADOS.seleccionado && numeros[index].usuario === user)){
            let nums = [...numeros];
            let nuevo_estado = numeros[index].estado === ESTADOS.disponible ? ESTADOS.seleccionado : ESTADOS.disponible;
            let nuevo_user = numeros[index].estado === ESTADOS.disponible ? user : '';

            let nuevo = {
                ...nums[index],
                estado: nuevo_estado ,
                usuario: nuevo_user
            }
            nums[index]=nuevo;
            
            actualizarEstadoYBD(nums);
            
        } else {
            let mensaje = `Número ${ESTADOS.toString[numeros[index].estado]}`;
            if(numeros[index].usuario === user){
                mensaje+=" por usted";
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
            console.log("rifa actualizada");
        })
        .catch((error)=>{
            console.error("Error updating document: ", error);
        });
    }

    useEffect(()=>{
        
        console.log("ejecutado useeffect de " + props.idRifa);
        
        
        //3. escuchar cambios
        firebase.db.collection("rifas").doc(props.idRifa)
        .onSnapshot(function(doc) {
            console.log(doc.metadata.hasPendingWrites ? "Local" : "Server");
            //console.log(doc.data());
            setNumeros(doc.data().numeros);
            setIsLoaded(true);
         }, function(error) {
            console.log(error);
         });
        setUser('usuario1');
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cambiaUser = (e) => {
        setUser(e.target.value);
    }

    const comprar = () => {
        let nums = [...numeros];
        numeros.map((value, index)=>{
            if(value.estado === ESTADOS.seleccionado && value.usuario === user) {
                console.log(value);
                
                let nuevo = {
                    ...nums[index],
                    estado: ESTADOS.pagado,
                    usuario: user
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
            <Provider value={{
                numeros: numeros,
                setEstado: cambiarEstado
            }}>
       
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Usuario..."
                    aria-label="Usuario..."
                    aria-describedby="basic-addon2"
                    defaultValue="usuario1"
                    onChange={cambiaUser}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={comprar}>Comprar</Button>
                    </InputGroup.Append>
                </InputGroup>
                <hr/>
                <Container>
                    <div className="grilla">
                    { numeros &&
                        numeros.map((value, index)=>{
                            let tipoBtn = ESTADOS.btnStyle[value.estado];
                            //si está seleccionado por otro usuario
                            if (value.estado=== ESTADOS.seleccionado && value.usuario !== user){
                                tipoBtn = ESTADOS.btnStyle[ESTADOS.reservado]
                            } else if (value.estado=== ESTADOS.pagado && value.usuario !== user){
                                tipoBtn = ESTADOS.btnStyle[ESTADOS.otro]
                            }
                            return (
                                <Numero 
                                    key={"btn"+value.valor} 
                                    valor={value.valor} 
                                    tipo={tipoBtn}
                                />               
                            )
                        }) 
                    }
                    </div>
                </Container>
                
            </Provider>
            
        );
    }
    
}

export default Grilla;
export const GC = Consumer;
