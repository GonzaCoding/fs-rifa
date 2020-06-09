import React, { Component } from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import firebase from '../Config/firebase';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';
import Slogan from '../Components/Slogan';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            login: false,
            errorLogin: '',
            validated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        let email = this.state.email;
        let password = this.state.pass;

        firebase.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    login: true
                })
            })
            .catch((error) => {
                console.log("error de logueo:");
                this.setState({
                    errorLogin: error.message
                })
            })

        var user = firebase.auth.currentUser;

        if (user) {
            console.log(user);
            console.log("displayname:" + user.displayName);
            console.log("email:" + user.email);

        } else {
            // No user is signed in.
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
        })
    }

    componentDidUpdate(){
        if(this.state.login){
            const history = this.props.history;
            setTimeout(()=>{
                history.push('/home');
            }, 4000)
        }
    }

    render() {
        const estado = this.state;
        if (estado.login === false) {
            return (
                <section>
                    <Slogan />
                    <p>Introduzca sus datos para ingresar en el sistema: </p>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">                        
                                <Form.Control required type="email" name="email" value={estado.email} placeholder="Ingrese email..." onChange={this.handleChange} />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese un email válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Control required type="password" name="pass" value={estado.pass} placeholder="Contraseña..." onChange={this.handleChange} />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese la contraseña.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Alert variant='danger' style={{ display: (estado.errorLogin === '' ? "none" : "block") }}>
                            Error de autenticación: {estado.errorLogin}
                        </Alert>

                        <Button variant="primary" type="submit">
                         ¡Ingresar!
                        </Button>{' '}
                        <Button as={Link} to={"/registro"} variant="primary">¡Registrarse!</Button>
                    </Form>
                </section>
            );
        } else {
            return (
                <section>
                    <Alert variant='success'>
                        ¡Ingreso exitoso! Está siendo redirigido al Inicio. Si la página no se redirecciona, haga click en el botón "Ir al inicio"
                    </Alert>
                    <Loading />
                    <Button style={{
                        marginTop: '20px'
                    }} as={Link} to={"/home"} variant="primary">Ir al inicio</Button>
                </section>
            )
        }
    }
}
export default Login;