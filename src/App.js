import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Route } from 'react-router';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Home from './Pages/Home';
import Crear from './Pages/Crear';
import Registro from './Pages/Registro';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Perfil from './Pages/Perfil';
import Participar from './Pages/Participar';
import { Container } from 'react-bootstrap';

const App = () =>(
  <div className="App">
    <BrowserRouter>
      <Header />
      <Container>
        <Redirect from="/" to="/home" />
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/crear" exact component={Crear} />
            <Route path="/participar/:id" exact component={Participar} />
            <Route path="/registro" exact component={Registro} />
            <Route path="/login" exact component={Login} />
            <Route path="/perfil" exact component={Perfil} />
            <Route path="/logout" exact component={Logout} />
          </Switch>
      </Container>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;

/*
<Container>
  <Redirect from="/" to="/home" />
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/crear" exact component={Crear} />
      <Route path="/participar/:id" exact component={Participar} />
      <Route path="/registro" exact component={Registro} />
      <Route path="/login" exact component={Login} />
      <Route path="/perfil" exact component={Perfil} />
      <Route path="/logout" exact component={Logout} />
    </Switch>
</Container>
*/