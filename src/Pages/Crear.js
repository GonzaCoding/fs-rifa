import React, { useRef } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import firebase from '../Config/firebase';
//import { Link } from 'react-router-dom';
//import Loading from '../Components/Loading';

const Crear = () => {
    const nombre = useRef();
    const descripcion = useRef();
    const fecha = useRef();
    const cantidad = useRef();

    const crearRifa = (rifa) => {
        const { contenido , numeros } = rifa;
        firebase.db.collection("rifas").add({
            contenido,
            numeros
        })
        .then((res) => console.log("Creada!"))
        .catch((err) => console.log("error:" + err));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
                
        let rifa = {
            contenido: {
                nombre: nombre.current.value,
                descripcion: descripcion.current.value,
                fecha: fecha.current.value,
                creador: firebase.auth.currentUser.uid
            },
            numeros:[]
        }

        for(let i=0;i<cantidad.current.value;i++) {
            const num = {
                estado: 0,
                usuario: "",
                valor: i+1
            }
            rifa.numeros.push(num);
        }
        console.log(rifa);
        crearRifa(rifa);
    }

    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control  type="text" ref={nombre} name="nombre" placeholder="Ingrese nombre..."  />
                        <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCantidad">
                        <Form.Label>Cantidad de números:</Form.Label>
                        <Form.Control required type="number" ref={cantidad} name="cantidad" placeholder="Cantidad..."  />
                        <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNumbers">
                        <Form.Label>Fecha del sorteo:</Form.Label>
                        <Form.Control type="date" ref={fecha} name="fecha"  />
                        <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridDescription">
                        <Form.Label>Descripción:</Form.Label>
                        <Form.Control  as="textarea" rows="3" ref={descripcion} name="descripcion" placeholder="Describa qué se rifará..." />
                        <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                    </Form.Group>

                </Form.Row>
                {/*<Alert variant='danger' style={{display: (this.state.errorCreated ==='' ? "none" : "block") }}>
                    Error al crear el usuario: {this.state.errorCreated}
                </Alert>*/}

                <Button variant="primary" type="submit">
                    Crear rifa!
                </Button>
            </Form>
        </section>
    );
}

export default Crear;