import React from 'react';
import './Login.scss';
import axios from 'axios';

import { Link } from 'react-router-dom';
import imagenLogin1 from '../../assets/img/login/image.png';

import history from '../History/History'

export const Login = function(props){
    const validarEmail=()=>{
        let inputemail=document.getElementById("emailLogin");
        let email = inputemail.value;
        let punto = email.lastIndexOf('.')
        let arroba = email.lastIndexOf('@')
        let long = email.length
        if(punto<0 || arroba>punto || long-(punto+1)<2 || long-(punto+1)>=4 ){
            inputemail.style.color="red";
            return false;
        }
        else{
            inputemail.style.color="blue";
            return true;
        }
    }
    const validarPassword=()=>{
        let inputpassword=document.getElementById("passwordLogin");
        return inputpassword.value.length>=8;
    }
    const validar=()=>{
       try{
           return validarEmail() && validarPassword();
       }
       catch(ex){
           console.error(ex);
       }
       finally{
       }
    }
  
    window.onload=function(){
        document.getElementById("button_form").onclick=validar;
    }
    
    const setToken=props.setToken;

    function loguearUsuario(){
        let email=document.getElementById("emailLogin").value;
        let password=document.getElementById("passwordLogin").value;
        let login={email: email,
                password:password}
        axios.post("http://localhost:9000/usuario/login",login)
        .then((res)=>{
            if(res.data.token){
                setToken(res.data.token)
                for(let [key,value] of Object.entries(res.data.user)){
                    if(key !== "currentToken" && key !== "fechaCreacion"){
                        localStorage.setItem(key,value)
                    }
                    else if(key === "currentToken"){
                        localStorage.token = value
                    }
                }
                history.push("/homepage")
            }
        })
    }

    return(
        <div>
            <div><img className="imagenPrincipal" src={imagenLogin1} alt="Imagen principal Login"/></div>
            <div className="text">
                <h4>¡Bienvenido de nuevo!</h4>
                <p>Por favor, introduce tus datos para continuar</p>
            </div>
            
            <div className="form_login">
                <div className="div_login">
                    <input type="email" id="emailLogin" name="email" placeholder="Dirección e.mail"/>  
                </div>
                <div className="div_login">
                    <input type="password" id="passwordLogin" name="password" placeholder="Password"/>
                </div>
                <div className="div_rec_password">
                    <Link to="/cambioPassword" className="link">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="div_button">
                    <button id="button_form" className="button_form" onClick={()=>{if(validar()){loguearUsuario()}}}>Entrar</button>
                </div>
            </div>
            <div className="footer">
                <p>¿Nuevo en Applergic?</p>
                <Link to="/registro" className="nueva_cuenta">Crea tu cuenta aquí</Link>
                <Link to="/homepage" className="link_otro_momento">Me registraré en otro momento</Link>
            </div>
        </div>
    )
}