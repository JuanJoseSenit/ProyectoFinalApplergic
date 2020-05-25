import React, { useState } from 'react';
import './RegistroContacto.scss'

export const RegistroContacto = function(props){
    const perfil = props.perfil
    const change = props.change
    let aseg = perfil.aseguradora !== "" && perfil.poliza !== "" ? `${perfil.aseguradora} / ${perfil.poliza}` : ""
    const [nomPol, setNomPol] = useState(aseg)
    const act = props.action
    
    function validarNombre(){
        let inputNombre;
        try{
            inputNombre = document.getElementById("contactoNombre").value;
        }
        catch{
            inputNombre = perfil.contactoNombre;
        }
        finally{
            return inputNombre !== "" && inputNombre.length >= 3
        }
    }
    function validarEmail(){
        let inputEmail;
        try{
            inputEmail = document.getElementById("contactoEmail").value;
        }
        catch{
            inputEmail = perfil.contactoEmail;
        }
        finally{
            if(inputEmail === "" || inputEmail.indexOf("@")===-1){
                document.getElementById("contactoEmail").classList.toggle("wrong",true)
                return false
            }
            document.getElementById("contactoEmail").classList.toggle("wrong",false)
            let afterarroba = inputEmail.split("@")[1];
            let posicionPunto = afterarroba.lastIndexOf(".");
            let len = afterarroba.length;
            return posicionPunto >= 0 && posicionPunto < len-2 && posicionPunto >= len-5            
        }
    }
    function validarMovil(){
        let inputMovil;
        try{
            inputMovil = document.getElementById("contactoMovil").value;
        }
        catch{
            inputMovil = perfil.contactoTelefono;
        }
        finally{
            let objRegExp = new RegExp("^[0-9]{6,9}");
            return inputMovil !== "" && objRegExp.test(inputMovil);
        }
    }
    function validarAsegPoliza(){
        let inputAsegPoliza;
        try{
            inputAsegPoliza = document.getElementById("AsegPoliza").value;
        }
        catch{
            inputAsegPoliza = `${perfil.aseguradora}/${perfil.poliza}`;
        }
        finally{
            let tex = inputAsegPoliza.split("/")
            if(tex.length !== 2) return false
            tex[0].trim()
            tex[1].trim()
            return tex[0] !== "" && tex[0].length > 5 && tex[1] !== "" && tex[1].length > 5
        }
    }
    function validacion(){
        let isValid = validarNombre() && validarEmail() && validarMovil() && validarAsegPoliza();
        return(isValid)
    }
    let clBot = "Link";
    if(validacion()){
        clBot += " activeButton"
    }
    else{
        clBot += " inactiveButton"
    }
    var botton = <button className={clBot} id="buttonContacto" onClick={()=>{if(validacion()){act(true)}}}>Guardar contacto</button>
    function setContactoCero(){
        document.getElementById("contactoNombre").value = ""
        document.getElementById("contactoEmail").value = ""
        document.getElementById("contactoMovil").value = ""
        document.getElementById("AsegPoliza").value = ""
        setNomPol("")
    }
    return(
        <div className="Form">
            <div className="overHead">
                <span className="Title">Vamos a añadir a tu contacto en caso de emergencia.</span>
                <span className="subTitle">Nos pondremos en contacto con tu persona de confianza y/o compañía de seguros en caso de emergencia.</span>
            </div>
            <div id="formularioContacto" className="formulario">
                <input className="input" id="contactoNombre" type="text" name="contactoNombre" value={perfil.contactoNombre}
                onChange={$event=>{change($event); validacion()}} placeholder="Nombre completo" required/>
                <input className="input" id="contactoEmail" type="email" name="contactoEmail" value={perfil.contactoEmail}
                onChange={$event=>{change($event); validacion()}} placeholder="Correo electrónico" required/>
                <input className="input" id="contactoMovil" type="tel" name="contactoTelefono" value={perfil.contactoTelefono}
                onChange={$event=>{change($event); validacion()}} placeholder="Móvil" required/>
                <input className="input" id="AsegPoliza" type="text" name="AsegPoliza" value={nomPol}
                onChange={$event=>{setNomPol($event.target.value);change($event); validacion()}} placeholder="Compañía de Seguros / Nº Póliza" required/>
                {botton}
            </div>

            <span className="smallLink" onClick={()=>{setContactoCero();act(true)}}>Registraré mi contacto en otro momento</span>
        </div>
    )
}

/*
var botton = <input className={clBot} type="submit" id="buttonContacto" onLoad={validacion} value="Guardar contacto"/>
            <form id="formularioContacto" method="POST" className="formulario" onSubmit={()=>{if(validacion()){act(true)}}}>
                <input className="input" id="contactoNombre" type="text" name="contactoNombre" value={perfil.contactoNombre}
                onChange={$event=>{change($event); validacion()}} placeholder="Nombre completo" required/>
                <input className="input" id="contactoEmail" type="email" name="contactoEmail" value={perfil.contactoEmail}
                onChange={$event=>{change($event); validacion()}} placeholder="Correo electrónico" required/>
                <input className="input" id="contactoMovil" type="tel" name="contactoTelefono" value={perfil.contactoTelefono}
                onChange={$event=>{change($event); validacion()}} placeholder="Móvil" required/>
                <input className="input" id="AsegPoliza" type="text" name="AsegPoliza" value={nomPol}
                onChange={$event=>{setNomPol($event.target.value);change($event); validacion()}} placeholder="Compañía de Seguros / Nº Póliza" required/>
                {botton}
            </form>

*/