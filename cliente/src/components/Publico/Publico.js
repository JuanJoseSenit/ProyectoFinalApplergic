import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../History/History'

import { Splash } from '../Splash/Splash';
import { Onboarding } from '../Onboarding/Onboarding';
import { Login } from '../Login/Login';
import { Registro } from '../Registro/Registro';
import { HomePage } from '../HomePage/HomePage';
import { PasswordOlvidada } from '../PasswordOlvidada/PasswordOlvidada'
import GoodRes from '../Good-results/good-results';

import {MapContainerRest} from '../API-Google/GoogleMaps';
import MapContainerComercios from '../API-Google/GoogleMaps';
import PagInicialMaps from '../API-Google/GoogleMaps';
import {Escaner} from '../Escaner/Escaner';
import { Terminos } from '../Terminos/Terminos';
import { Guide } from '../Guide/Guide';
import Traductor from '../Traductor/traductor';
import DiarioLeer from '../DiarioLeer/diarioLeer';

export const Publico = function(props){
 
    return(
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <Splash />
                </Route>
                <Route path="/onboarding">
                    <Onboarding/>
                </Route>
                <Route path="/login">
                    <Login setToken={props.setToken}/>
                </Route>
                <Route path="/cambiopassword">
                    <PasswordOlvidada/>
                </Route>
                <Route path="/registro">
                    <Registro listAlergias={props.listAlergias} setToken={props.setToken}/>
                </Route>
                <Route path="/homepage">
                    <HomePage/>
                </Route>
                <Route path="/escaner">
                    <Escaner/>
                </Route>
                <Route path="/resultados">
                    <GoodRes/>
                </Route>
                <Route path="/maps">
                    <PagInicialMaps/>
                </Route>
                <Route path="/buscarRestaurantes">
                    <MapContainerRest/>
                </Route>
                <Route path="/buscarComercios">
                    <MapContainerComercios/>
                </Route>
                <Route path="/terminos">
                    <Terminos/>
                </Route>
                <Route path="/guia">
                    <Guide/>
                </Route>
                <Route path="/traductor">
                    <DiarioLeer/>
                </Route>
            </Switch>
        </Router>
    )
}