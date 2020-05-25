import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../History/History';

import { Splash } from '../Splash/Splash';

import { HomePage } from '../HomePage/HomePage';
import { Perfil }  from '../Perfil/Perfil'
import {Escaner} from '../Escaner/Escaner';
import GoodRes from '../Good-results/good-results';
import MapContainer from '../API-Google/GoogleMaps';
import Diario from '../Diario/Diario';
import DiarioEscribir from '../DiarioEscribir/DiarioEscribir'
//import { SOS } from '../SOS/SOS';
//import { Traductor } from '../Traductor/Traductor'
import Favoritos from '../Favoritos/Favoritos'
import { Evaluacion } from '../Evaluacion/Evaluacion'
import { Sugerencias } from '../Sugerencias/Sugerencias'
import { Terminos } from '../Terminos/Terminos';
import { Guide } from '../Guide/Guide';
import { IntroduccionDatos } from '../IntroduccionDatos/IntroduccionDatos';
import MapContainerRest from '../API-Google/GoogleMaps';
import { PagInicialMaps } from '../API-Google/PagInicialMaps';
import  MapContainerComercios  from '../API-Google/MapContainerComercios';
import axios from 'axios'
import Traductor from '../Traductor/traductor';
import DiarioLeer from '../DiarioLeer/diarioLeer';

export const Privado = function(props){
    const manageLogout = function(){
        let data = {id:localStorage.id}
        let token = localStorage.token;
        axios.put('http://localhost:9000/usuario/logout',data,{headers:{"Authorization": `Bearer ${token}`}})
             .then((res)=>console.log(res.data),(err)=>alert(err))
        localStorage.clear()
        history.push("/")
    }
    return(
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <Splash />
                </Route>
                <Route path="/homepage">
                    <HomePage manageLogout={manageLogout}/>
                </Route>
                <Route path="/favoritos">
                    <Favoritos/>
                </Route>
                <Route path="/perfil">
                    <Perfil listAlergias={props.listAlergias}/>
                </Route>
                <Route path="/escaner">
                    <Escaner/>
                </Route>
                <Route path="/resultados">
                    <GoodRes/>
                </Route>
                <Route path="/DiarioEscribir">
                    <DiarioEscribir/>
                </Route>
                <Route path="/Diario">
                    <Diario/>
                </Route>
                <Route path="/buscar">
                    <MapContainer/>
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
                <Route path="/evaluacion">
                    <Evaluacion manageLogout={manageLogout}/>
                </Route>
                <Route path="/sugerencias">
                    <Sugerencias/>
                </Route>
                <Route path="/terminos">
                    <Terminos/>
                </Route>
                <Route path="/guia">
                    <Guide/>
                </Route>
                <Route path="/datos">
                    <IntroduccionDatos/>
                </Route>
                <Route path="/traductor">
                    <DiarioLeer/>
                </Route>
            </Switch>
        </Router>
    )
}