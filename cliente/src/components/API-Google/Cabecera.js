import React, { useState } from 'react';
import{ Link } from 'react-router-dom';
import "./GoogleMaps.scss";

export const Cabecera = function (props) {
    
    /* function cambiarColor(evento){
        let restaurante=document.getElementById("restaurante");
        let comercio=document.getElementById("comercio");
        if(evento.target==restaurante){
            restaurante.style.backgroundColor="red";
            comercio.style.backgroundColor="";
        }
        else{
            comercio.style.backgroundColor="red";
            restaurante.style.backgroundColor=""; 
        }
    } */
    
    return (
        <nav className="cabecera">
            <Link id="home" className="link" to= "/homepage"> &lt;Volver</Link>
            <Link id={props.colorRest} className="link"  to="/buscarRestaurantes">Restaurantes</Link>
            <Link id={props.color} className="link"  to="/buscarComercios">Comercios</Link>
        </nav>
    );
}