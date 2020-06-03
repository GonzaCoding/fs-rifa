import React, { Component } from 'react';
import { Form, Button, Col, InputGroup, Alert } from 'react-bootstrap';
//import firebase from '../Config/firebase';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';

class Registro extends Component {
    constructor() {
        super();

        this.state = {
            nombre: '',
            apellido: '',
            email: '',
            username: '',
            pass: '',
            pass2: '',
            created: false,
            errorCreated: '',
            validated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    crearUsuario() {
        let email = this.state.email;
        let password = this.state.pass;

        /*firebase.auth.createUserWithEmailAndPassword(email, password)
            .then((arg) => {
                firebase.db.collection("usuarios").add({
                    uid: arg.user.uid,
                    nombre: this.state.nombre,
                    apellido: this.state.apellido,
                    username: this.state.username
                });
                this.setState({
                    created: true,
                    errorCreated: ''
                })
                return true;
            })
            .catch((error) => {
                console.log("Error GI: ");
                console.log(error.code);
                this.setState({
                    errorCreated: error.message,
                })
                return false;
            })   */     
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log(this.state);
            this.setState({
                validated: true
            });
        } else {
            if(form.pass.value === form.pass2.value){
                this.crearUsuario();
            } else {
                this.setState({
                    created: false,
                    errorCreated: 'Las contraseñas no coinciden'
                });
            }
            
        }
        event.preventDefault();
        event.stopPropagation();

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            errorCreated: ''
        })
    }

    componentDidUpdate(){
        if(this.state.created){
            const history = this.props.history;
            setTimeout(()=>{
                history.push('/home');
            }, 4000)
        }
    }

    render() {
        const estado = this.state;

        if(estado.created === false)
            return (
                <Form noValidate validated={estado.validated} onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control required type="text" name="nombre" value={estado.nombre} placeholder="Ingrese nombre..." onChange={this.handleChange} />
                            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSurname">
                            <Form.Label>Apellido:</Form.Label>
                            <Form.Control required type="text" name="apellido" value={estado.apellido} placeholder="Ingrese apellido..." onChange={this.handleChange} />
                            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control required type="email" name="email" value={estado.email} placeholder="Ingrese email..." onChange={this.handleChange} />
                            <Form.Control.Feedback type="invalid">
                                    Ingrese un email válido.
                                </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="validationCustomUsername">
                            <Form.Label>Nombre de usuario:</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={estado.username}
                                    placeholder="Nombre de usuario..."
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese un nombre de usuario válido.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control required type="password" name="pass" value={estado.pass} placeholder="Contraseña..." onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword2">
                            <Form.Label>Repetir contraseña:</Form.Label>
                            <Form.Control required type="password" name="pass2" value={estado.pass2} placeholder="Repetir contraseña..." onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <Alert variant='danger' style={{display: (this.state.errorCreated ==='' ? "none" : "block") }}>
                        Error al crear el usuario: {this.state.errorCreated}
                    </Alert>

                    <Button variant="primary" type="submit">
                        🎙 Registrarse!
                    </Button>
                </Form>
            );
        else
            return (
                <div>
                    <Alert variant='success'>
                        ¡Usuario creado con éxito! Está siendo redirigido al Inicio. Si la página no se redirecciona, haga click en el botón "<span role="img" aria-label="Music">🎼</span> Ir al inicio"
                    </Alert>
                    <Loading />
                    <Button style={{
                        marginTop: '20px'
                    }} as={Link} to={"/home"} variant="primary"><span role="img" aria-label="Music">🎼</span> Ir al inicio</Button>
                </div>
            )
    }
}
export default Registro;