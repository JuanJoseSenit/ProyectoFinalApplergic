import React, { useState } from 'react';
import axios from 'axios';
import camara from '../../assets/images/camaraImagen.png'
import './Perfil.scss'
import history from '../History/History'

export const Perfil = function(props){
    const [perfil,setPerfil] = useState(localStorage)
    const [foto,setFoto] = useState('http://localhost:9000/'+localStorage.foto.replace(/\\/g,"/"))
    const fotoIni = 'http://localhost:9000/'+localStorage.foto.replace(/\\/g,"/")
    
    function setValue(name,value){
        setPerfil({...perfil,[name]:value})
    }
    const token = localStorage.token
    const listAlergias = props.listAlergias
    const [phase,setPhase] = useState(0);
    
    const actualizarPerfil = function(){
        let fd = new FormData()
        for(let [key,value] of Object.entries(perfil)){
            if(typeof(value)==="string") value = value.trim()
            if(value !== localStorage.getItem(key)) fd.append(key,value)
        }
        fd.append("id",localStorage.id)
        if(foto !== fotoIni) fd.append("foto",foto)
        axios.put("http://localhost:9000/usuario/perfil",fd,{headers:{"Authorization": `Bearer ${token}`}})
             .then((res)=>console.log(res.data),(error)=>alert(error))
        for(let [key,value] of Object.entries(perfil)){
            localStorage.setItem(key,value)
        }
    }
    
    const change = function(event){
        let name = event.target.name
        let value = event.target.value
        if(name === "AsegPoliza"){
            let texSp = value.split("/")
            if(texSp.length === 1){
                setValue("aseguradora",texSp[0])
            }
            else if(texSp.length>=2){
                setValue("aseguradora",texSp[0])
                setValue("poliza",texSp[1])
            }
        }
        else if(name==="foto"){
            setFoto(event.target.files[0])
        }
        else{
            setValue(name,value)
        }
    }

    const movimiento = function(value){
        let id0=`cambio${phase}`
        let id1=`cambio${value}`
        document.getElementById(id0).classList.toggle("inactive")
        document.getElementById(id0).classList.toggle("active")
        document.getElementById(id1).classList.toggle("active")
        document.getElementById(id1).classList.toggle("inactive")
        setPhase(value)
    }

    const botonesCambio = [
        <button className="topButton active" id="cambio0" key="cambio0" onClick={()=>movimiento(0)}>Perfil</button>,
        <button className="topButton inactive" id="cambio1" key="cambio1" onClick={()=>movimiento(1)}>Personal</button>,
        <button className="topButton inactive" id="cambio2" key="cambio2" onClick={()=>movimiento(2)}>Contacto</button>,
        <button className="topButton inactive" id="cambio3" key="cambio3" onClick={()=>movimiento(3)}>Alergias</button>
    ]

    //Para mostrar el perfil completo
    let alerMuestra=""
    var alergias = perfil.alergias
    if(typeof(alergias)==="string"){
        alergias = alergias.split(",")
    }
    for(let i=0;i<alergias.length-1;i++){
        let al = alergias[i]
        alerMuestra+=`${al},`
    }
    alerMuestra += alergias[alergias.length-1]
    
    const MuestraPerfil = [
        <div className="Muestra" id="MuestraPersonal" key="MuestraPersonal">
            <p className="MuestraTitle">Personal</p>
            <p className="MuestraInd">Nombre: {perfil.nombre}</p>
            <p className="MuestraInd">Email: {perfil.email}</p>
            <p className="MuestraInd">Móvil: {perfil.telefono}</p>
        </div>,
        <div className="Muestra" id="MuestraContacto" key="MuestraContacto">
            <p className="MuestraTitle">Contacto</p>
            <p className="MuestraInd">Nombre: {perfil.contactoNombre}</p>
            <p className="MuestraInd">Email: {perfil.contactoEmail}</p>
            <p className="MuestraInd">Móvil: {perfil.contactoTelefono}</p>
        </div>,
        <div className="Muestra" id="MuestraAseguradora" key="MuestraAseguradora">
            <p className="MuestraTitle">Seguro</p>
            <p className="MuestraInd">Aseguradora: {perfil.aseguradora}</p>
            <p className="MuestraInd">Nº Póliza: {perfil.poliza}</p>
        </div>,
        <div className="Muestra" id="MuestraAlergias" key="MuestraAlergias">
            <p className="MuestraTitle">Alergias</p>
            <p className="MuestraInd">{alerMuestra}</p>
        </div>    
    ]

    //Para poder cambiar los aspectos personales del perfil
    let cam;
    if(typeof(foto)==="string")
    {
        cam = foto
    }
    else{
        cam = foto ? URL.createObjectURL(foto) : camara;
    }     
    const loadFile = function(event){
        let image = document.getElementById("image");
        let file = event.target.files[0]
        console.log(file)
        let reader = new FileReader()
        reader.onloadend = function(){
            image.src = reader.result
        }
        if(file){
            reader.readAsDataURL(file)
        }else{
            image.src=""
        }

        //setValue("foto",event.target.files[0]);
        /*let url = URL.createObjectURL(event.target.files[0])
        let img = document.getElementById("image")
        img.src = url
        img.onload = function(){URL.revokeObjectURL(this.src)}*/
    }
    const CambioPersonal = [
        <label htmlFor="foto" key="labelImage" className="fotoLabel">
            <img src={cam} id="image" alt="Imagen usuario"/>
        </label>,
        <input type="file" key="inputfile" className="inputfile" id="foto" name="foto" accept="image/gif,image/jpeg,image/jpg,image/png" 
        onChange={$event=>{change($event);loadFile($event)}}/>,
        <input className="input" key="inputNombre" id="inputNombre" type="text" name="nombre" value={perfil.nombre}
        onChange={$event=>{change($event);validacion()}} placeholder="Nombre completo" required/>,
        <input className="input" key="inputEmail" id="inputEmail" type="email" name="email" value={perfil.email}
        onChange={$event=>{change($event);validacion()}} placeholder="Correo electrónico" required/>,
        <input className="input" key="inputMovil" id="inputMovil" type="tel" name="telefono" value={perfil.telefono}
        onChange={$event=>{change($event);validacion()}} placeholder="Móvil" required/>
    ]

    //Para poder cambiar los aspectos de contacto del perfil
    const CambioContacto = [
        <input className="input" key="contactoNombre" id="contactoNombre" type="text" name="contactoNombre" value={perfil.contactoNombre}
        onChange={$event=>{change($event);validacion()}} placeholder="Nombre completo" required/>,
        <input className="input" key="contactoEmail" id="contactoEmail" type="email" name="contactoEmail" value={perfil.contactoEmail}
        onChange={$event=>{change($event);validacion()}} placeholder="Correo electrónico" required/>,
        <input className="input" key="contactoMovil" id="contactoMovil" type="tel" name="contactoTelefono" value={perfil.contactoTelefono}
        onChange={$event=>{change($event);validacion()}} placeholder="Móvil" required/>,
        <input className="input" key="AsegPoliza" id="AsegPoliza" type="text" name="AsegPoliza" value={`${perfil.aseguradora}/${perfil.poliza}`}
        onChange={$event=>{change($event)}} placeholder="Compañía de Seguros / Nº Póliza" required/>
    ]

    //Para poder cambiar los aspectos referentes a las alergias
    var drawAlergias = []
    function checkLetra(letra){
        for(const value of Object.values(listAlergias[letra])){
            if(alergias.indexOf(value) !== -1) return true;
        }
        return false
    }
    function toggleAlergia(list,alergia){
        var i = list.indexOf(alergia)
        if(i === -1) list.push(alergia)
        else list.splice(i,1)
        if(list[0] === "") list.splice(0,1)
        list.sort()
        change({target: {name: "alergias",value:list}})
    }
    function toggleHead(letra){
        document.getElementById(`idTop${letra}`).classList.toggle("activeAlergia",checkLetra(letra))
        document.getElementById(`idHead${letra}`).classList.toggle("activeAlergia",checkLetra(letra))
    }
    var header = []
    for(const [letra,listado] of Object.entries(listAlergias)){
        let keyTop = `top${letra}`
        let keyBlock = `block${letra}`
        let keyHead = `head${letra}`
        let idTop = `idTop${letra}`
        let idHead = `idHead${letra}`
        let clTop = checkLetra(letra) ? "letra activeAlergia":"letra"
        header.push(<a className={clTop} id={idTop} key={keyTop} href={`#${keyHead}`}><span id={letra}>{letra}</span></a>)
        let head = <div key={keyHead} className="headLetra">
            <span name={keyHead} id={idHead} className={clTop}>{letra}</span>
            <a href="#top" className="topLink">&#8896;</a>
        </div>
        let inter=[]
        listado.forEach(aler=>{
            let keyAler = `key${letra}${aler}`;
            let cls = alergias.indexOf(aler) !== -1 ? "alergia activeAlergia":"alergia inactiveAlergia";
            inter.push(
                <span className={cls} key={keyAler} id={keyAler} onClick={($event)=>{
                    $event.target.classList.toggle("activeAlergia")
                    $event.target.classList.toggle("inactiveAlergia")
                    toggleAlergia(alergias,aler)
                    toggleHead(letra)
                }}>{aler}</span>
            )
        })
        let all = <div className="alergiaLetra" key={keyBlock}>
            {head}
            <div className="alergiaPorLetra">
                {inter}
            </div>
        </div>
        drawAlergias.push(all)
    }

    const CambioAlergia = [
        <div className="headerAlergias" key="header">{header}</div>,
        <div className="bodyAlergias" key="drawAlergias">{drawAlergias}</div>
    ]

    const show = [MuestraPerfil,CambioPersonal,CambioContacto,CambioAlergia]
    function validarNombre(){
        let inputNombre = perfil.nombre;
        return inputNombre !== "" && inputNombre.length >= 3
    }
    function validarEmail(){
        let inputEmail = perfil.email;
        if(inputEmail === "" || inputEmail.indexOf("@")===-1) return false
        let afterarroba = inputEmail.split("@")[1];
        let posicionPunto = afterarroba.lastIndexOf(".");
        let len = afterarroba.length;
        return posicionPunto >= 0 && posicionPunto < len-2 && posicionPunto >= len-5
    }
    function validarMovil(){
        let inputMovil = perfil.telefono;
        let objRegExp = new RegExp("^[0-9]{6,9}");
        return inputMovil !== "" && objRegExp.test(inputMovil);
    }
    function validarNombreContacto(){
        let inputNombre = perfil.contactoNombre;
        return inputNombre !== "" && inputNombre.length >= 3
    }
    function validarEmailContacto(){
        let inputEmail = perfil.contactoEmail;
        if(inputEmail === "" || inputEmail.indexOf("@")===-1) return false
        let afterarroba = inputEmail.split("@")[1];
        let posicionPunto = afterarroba.lastIndexOf(".");
        let len = afterarroba.length;
        return posicionPunto >= 0 && posicionPunto < len-2 && posicionPunto >= len-5            
    }
    function validarMovilContacto(){
        let inputMovil = perfil.contactoTelefono;
        let objRegExp = new RegExp("^[0-9]{6,9}");
        return inputMovil !== "" && objRegExp.test(inputMovil);
    }
    function validarAsegPoliza(){
        let inputAseg = perfil.aseguradora;
        let inputPoliza = perfil.poliza;
        return inputAseg !== "" && inputAseg.length > 5 && inputPoliza !== "" && inputPoliza.length > 5
    }
    function validacion(){
        let isPersonalValid = validarNombre() && validarEmail() && validarMovil()
        let isContactoValid = validarNombreContacto() && validarEmailContacto() && validarMovilContacto()
        return isPersonalValid && isContactoValid && validarAsegPoliza()
    }
    let clBot = "Link"
    if(validacion())
    {
        clBot += " activeBoton"
    }
    else{
        clBot += " inactiveButton"
    }
    const botonUpdate = phase === 0 ? <button id="buttonPerfil" className={clBot} onClick={()=>{if(validacion()){actualizarPerfil()}}}>Guardar perfil</button> : null;
    
    return(
        <div id="Perfil">
            <div className="stepHeader">
                <table>
                    <tbody>
                        <tr>
                            <td className="backLink"><span className="smallLink" onClick={()=>{history.push("/homepage")}}>&lt; Volver</span></td>
                            <td className="stepReg"><span className="Paso">Gestión de Perfil</span></td>
                            <td className="rightIcon"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div id="botonesPerfilTop">
                {botonesCambio}
            </div>
            <div className="form">
                {show[phase]}
                {botonUpdate}
            </div>
        </div>
    )   
}