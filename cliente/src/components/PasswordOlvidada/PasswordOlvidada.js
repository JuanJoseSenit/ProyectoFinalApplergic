import React from 'react';
import axios from 'axios';
import './PasswordOlvidada.scss';
import{
    Link
  } from 'react-router-dom';
import imagenLogin1 from '../../assets/img/login/image.png';
import history from '../History/History'

export const PasswordOlvidada = function(props){
    const validarEmail=()=>{
        let inputemail=document.getElementById("email");
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
        let inputpassword=document.getElementById("password");
        let inputpassword2=document.getElementById("passwordRepeticion");
        if(inputpassword.value===inputpassword2.value && inputpassword.value.length>8){
            inputpassword.style.color="blue";
            inputpassword2.style.color="blue";
            return true;
            
        }else{
            inputpassword.style.color="red";
            inputpassword2.style.color="red";
            return false;
        }
    }
    const validarMovil=()=>{
        let inputMovil=document.getElementById("telefono");
        let objRegExp = new RegExp("^[0-9]{6,9}");
        if(inputMovil.value !== "" && objRegExp.test(inputMovil.value)){
            inputMovil.style.color="blue";
            return true;
        }
        else{
            inputMovil.style.color="red";
            return false;
        }
    }
    
    const validar=()=>{
       try{
           return validarEmail() && validarPassword() && validarMovil();
       }
       catch(ex){
           console.error(ex);
       }
       finally{
       }
    }
  
    window.onload=function(){
        document.getElementById("button").onclick=validar;
    }
    
    function cambioPassword(){
        let email=document.getElementById("email").value;
        let telefono=document.getElementById("telefono").value;
        let password=document.getElementById("password").value;
        let changePass={email:email,
                        telefono:telefono,
                        password:password};
        axios.post("http://localhost:9000/usuario/password",changePass)
             .then((res)=>{console.log(res.data);history.push("/login")}) 
    }
        
    return(
            <div>
                <div><img src={imagenLogin1} alt="Imagen principal Login"/></div>
                <p className="texto">Por favor, introduce tu teléfono, correo electrónico y la nueva contraseña</p>
                <div className="form">
                    <input id="telefono" type="tel" className="input" name="telefono" placeholder="Número teléfono"/>
                    <input id="email" type="email" className="input" name="email" placeholder="Email"/>
                    <input id="password" type="password" className="input" name="password" placeholder="Nueva contraseña"/>
                    <input id="passwordRepeticion" type="password" className="input" placeholder="Repita la nueva contraseña"/>
                    <button id="button" className="button" onClick={()=>{if(validar()){cambioPassword()}}}>Modificar Contraseña</button>
                </div>
                <Link to="/login" className="volver_login">Volver</Link>
            </div>
    );
}
export default PasswordOlvidada;