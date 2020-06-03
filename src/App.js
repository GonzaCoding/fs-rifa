import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Route } from 'react-router';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Home from './Pages/Home';
import Registro from './Pages/Registro';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import MiPerfil from './Pages/MiPerfil';

const App = () =>(
  <div className="App">
    <BrowserRouter>
      <Header />
      <section className="principal">
        <Redirect from="/" to="/home" />
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/registro" exact component={Registro} />
          <Route path="/login" exact component={Login} />
          <Route path="/miperfil" exact component={MiPerfil} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </section>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
