import React, { Component } from 'react';
import { Form, Button, Col, InputGroup, Alert } from 'react-bootstrap';
import firebase from '../Config/firebase';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';

class Perfil extends Component {
    constructor(props) {
        super(props);
        
        var user = firebase.auth.currentUser;
        this.state = {
            uid: user.uid,
            nombre: '',
            apellido: '',
            email: user.email,
            username: '',
            pass: '',
            pass2: '',
            updated: false,
            errorUpdated: '',
            validated: false,
            login: false
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.traerUsuario();
    }

    componentDidUpdate(){
        if(this.state.updated){
            const history = this.props.history;
            setTimeout(()=>{
                history.push('/home');
            }, 4000)
        }
    }
    
    traerUsuario = async () => {
        const usr = await firebase.db.collection("usuarios").where("uid", "==",this.state.uid).get();           
        await usr.forEach(async function(usrData) {            
            this.setState({
                ...usrData.data(),
                id: usrData.id
            });
        }, this);
    } 

    actualizarUsuario() {
        firebase.db.collection("usuarios").doc(this.state.id).update({
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            username: this.state.username
        })
        .then(()=>{
            this.setState({
                updated: true,
                errorUpdated: ''
            })
        })
        .catch((error) => {
            console.log("Error GI: ");
            console.log(error.code);
            this.setState({
                errorUpdated: error.message,
            })
            return false;
        })        
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            //console.log(this.state);
            this.setState({
                validated: true
            });
        } else {
            this.actualizarUsuario();            
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            errorUpdated: ''
        })
    }

    irPerfil = () => {
        this.setState({
            updated: false,
            validated: false
        })
    }

    render() {
        const estado = this.state;

        if(estado.updated === false)
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
                            <Form.Control disabled type="email" name="email" value={estado.email} placeholder="Ingrese email..." onChange={this.handleChange} />
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

                    
                    <Alert variant='danger' style={{display: (this.state.errorUpdated ==='' ? "none" : "block") }}>
                        Error al actualizar el usuario: {this.state.errorUpdated}
                    </Alert>


                    <Button variant="primary" type="submit">
                        Actualizar
                    </Button>
                    &nbsp;
                    <Button 
                        onClick={()=>{
                            this.props.history.goBack();
                        }} 
                        variant="primary"
                    >
                        Volver
                    </Button>
                </Form>
            );
        else
            return (
                <div>
                    <Alert variant='success'>
                        ¡Información de Usuario actualizada con éxito!  Está siendo redirigido al Inicio. Si la página no se redirecciona, haga click en el botón "Ir al inicio"
                    </Alert>
                    <Loading />
                    <Button style={{
                        marginTop: '20px'
                    }} as={Link} to={"/home"} variant="primary">Ir al inicio</Button>
                </div>
            )
    }
}
export default Perfil;