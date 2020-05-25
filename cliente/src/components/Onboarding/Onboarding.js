import React, { useState } from 'react';
import './Onboarding.scss'
import logo from "../../assets/img/onboarding/logo.png"
import scan2 from '../../assets/img/onboarding/pag1/scan2.png'
import rectangle from "../../assets/img/onboarding/pag2/rectangle.png"
import ambulancia from "../../assets/img/onboarding/pag3/ambulancia.png"
import traduccion from "../../assets/img/onboarding/pag4/traduccioN.png"
import puntitos1 from "../../assets/img/onboarding/pag1/mago51.png"
import puntitos2 from "../../assets/img/onboarding/pag2/mago52.png"
import puntitos3 from "../../assets/img/onboarding/pag3/mago53.png"
import puntitos4 from "../../assets/img/onboarding/pag4/mago54.png"
import{ Link } from 'react-router-dom';
import history from '../History/History';

export const Onboarding = function(){
    const [phase,setPhase] = useState(0)
    const imagenes = [scan2,rectangle,ambulancia,traduccion]
    const textos = ["¡Bienvenido a Applergic! Escanea el código de barras de tu producto y Applergic te dirá si es apto para ti.",
                    "Lleva tu Diario de compras y actividades.",
                    "En caso de emergencia nos pondremos en contacto con la persona que nos digas.",
                    "Viaja a donde quieras. Tendrás a tu disposición un traductor off-line y tu informe de alergias e intolerancias traducido al idioma local."
    ]
    const puntitos = [puntitos1,puntitos2,puntitos3,puntitos4]
    const valorBoton = [`Siguiente >`,"Siguiente >","Siguiente >","Terminar"]
    const clickFinal = [()=>setPhase(1),()=>setPhase(2),()=>setPhase(3),()=>{history.push("/login")}]
    
    return(
        <div className="contenedor_onboarding">
            <figure className="logo"><img className="img-responsive" src={logo} alt="Logo onboarding"/></figure>
            <figure><img className="img-responsive" src={imagenes[phase]} alt="Imagen responsive 1"/></figure>
            <div className="texto"><p>{textos[phase]}</p></div>
            <figure><img className="img-responsive" src={puntitos[phase]} alt="Imagen responsive 2"/></figure>
            <footer className="saltar_siguiente">
                <p ><Link className="saltar" to="/login">Saltar</Link></p>
                <p className="siguiente" onClick= {clickFinal[phase]}>{valorBoton[phase]}</p> 
            </footer>
        </div>
    );
}