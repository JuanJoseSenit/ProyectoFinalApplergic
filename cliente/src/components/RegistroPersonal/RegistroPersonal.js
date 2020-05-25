import React from 'react'
import camara from '../../assets/images/camaraImagen.png'
import './RegistroPersonal.scss'

export const RegistroPersonal = function(props){
    const perfil = props.perfil
    const change = props.change
    const act = props.action
    const foto = props.foto
    const cam = foto ? URL.createObjectURL(foto) : camara;
    
    const loadFile = function(event){
        let image = document.getElementById("image")
        let file = event.target.files[0]
        let reader = new FileReader()
        reader.onloadend = function(){
            image.src = reader.result
        }
        if(file){
            reader.readAsDataURL(file)
        }
        else{
            image.src = ""
        }
    }
    function validarNombre(){
        let inputNombre;
        try{
            inputNombre = document.getElementById("inputNombre").value;
        }
        catch{
            inputNombre = perfil.nombre;
        }
        finally{
            return inputNombre !== "" && inputNombre.length >= 3
        }
    }
    function validarEmail(){
        let inputEmail;
        try{
            inputEmail =  document.getElementById("inputEmail").value
        }
        catch{
            inputEmail = perfil.email;
        }
        finally{
            if(inputEmail === "" || inputEmail.indexOf("@")===-1) return false
            let afterarroba = inputEmail.split("@")[1];
            let posicionPunto = afterarroba.lastIndexOf(".");
            let len = afterarroba.length;
            return posicionPunto >= 0 && posicionPunto < len-2 && posicionPunto >= len-5
        }
    }
    function validarMovil(){
        let inputMovil; 
        try{
            inputMovil =  document.getElementById("inputMovil").value;
        }
        catch{
            inputMovil = perfil.telefono;
        }
        finally{
            let objRegExp = new RegExp("^[0-9]{6,9}");
            return inputMovil !== "" && objRegExp.test(inputMovil);    
        }
    }
    function validarPassword(){
        let inputPassword;
        try{
            inputPassword = document.getElementById("inputPassword").value
        }
        catch{
            inputPassword = perfil.password
        }
        finally{
            return inputPassword !== "" && inputPassword.length >= 8
        }
    }
    function validacion(){
        let isValid = validarNombre() && validarEmail() && validarMovil() && validarPassword();
        return(isValid)
    }
    let clBot = "Link";
    if(validacion()){
        clBot += " activeButton"
    }
    else{
        clBot += " inactiveButton"
    }
    var botton = <button id="buttonPerfil" className={clBot} onClick={()=>{if(validacion()){act(true)}}}>Guardar perfil</button>

    return(
        <div className="Form">
            <div className="overHead">
                <span className="Title">Dinos quién eres.</span>
            </div>
            <div id="formularioPerfil" className="formulario">
                <label htmlFor="foto" className="fotoLabel">
                    <img src={cam} id="image" alt="Imagen usuario"/>
                </label>
                <input type="file" className="inputfile" id="foto" name="foto" accept="image/gif,image/jpeg,image/jpg,image/png" 
                onChange={$event=>{change($event); loadFile($event)}}/>
                <input className="input" id="inputNombre" type="text" name="nombre" value={perfil.nombre}
                onChange={$event=>{change($event); validacion()}} placeholder="Nombre completo" required/>
                <input className="input" id="inputEmail" type="email" name="email" value={perfil.email}
                onChange={$event=>{change($event); validacion()}} placeholder="Correo electrónico" required/>
                <input className="input" id="inputMovil" type="tel" name="telefono" value={perfil.telefono}
                onChange={$event=>{change($event); validacion()}} placeholder="Móvil" required/>
                <input className="input" id="inputPassword" type="password" name="password" value={perfil.password}
                onChange={$event=>{change($event); validacion()}} placeholder="Contraseña" required/>
                {botton}
            </div>
        </div>
    )
}