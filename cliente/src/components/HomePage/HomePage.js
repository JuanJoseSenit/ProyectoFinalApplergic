import React from 'react';
import './HomePage.scss';
import logo from '../../assets/img/Home/logoApplergicFinal.png'
import barcode2 from '../../assets/img/Home/barcode2.png'
import buscar from '../../assets/img/Home/buscar.png'
import sos from '../../assets/img/Home/sos1.png'
import menAzul from '../../assets/img/Home/menAzul.png'
import gris from '../../assets/img/Home/gris.png'
import{
    Link
  } from 'react-router-dom';
import history from '../History/History';
  
export const HomePage = function(props){
   
    const valoresBotones=[{img:barcode2,value:"Escanear",id:"boton_escanear"},
                        {img:buscar,value:"Buscar",id:"boton_buscar"},
                        {img:sos,value:"S.O.S",id:"boton_SOS"}];
    const mensajes=["Escanea un nuevo producto.","Busca un comercio o restaurante para ti.","¿Necesita ayuda urgente? Contactamos con emergencias."];
    
    let arrayBotones = [];
    for (let i = 0; i < valoresBotones.length; i++){
        let btn = valoresBotones[i]
        let key = `BotonesHomepage${i}`
        let boton = <button className="boton" id={btn.id} onClick={()=>FuncionBotones(i)}><img src={btn.img} alt={btn.value}/>{btn.value}</button>
        let texto = <p className="texto">{mensajes[i]}</p>
        arrayBotones.push(
            <div className="boton_y_texto" key={key}>
                {boton}
                {texto}
            </div>
        )
    }
    const menuOptions = []
    if(localStorage.token){
        menuOptions.push(<li key="Perfil"><span className="icon-profile" onClick={()=>{history.push("/perfil")}}> Perfil</span></li>)
        menuOptions.push(<li key="Favoritos"><span className="icon-star-empty" onClick={()=>{history.push("/favoritos")}}> Favoritos</span></li>)
        menuOptions.push(<li key="Diario"><span className="icon-book" onClick={()=>{alert("¿De qué has hablado?")}}> Diario</span></li>)
        menuOptions.push(<li key="Compartir"><span className="icon-compartir" onClick={()=>{alert("Compartiendo...")}}> Compartir</span></li>)
        menuOptions.push(<li key="Traductor"><span className="icon-google-translate" onClick={()=>{alert("This is in another language")}}> Traductor</span></li>)
        menuOptions.push(<li key="Terminos"><span className="icon-file-text2" onClick={()=>{history.push("/terminos")}}> Términos</span></li>)
        menuOptions.push(<li key="Salida"><span className="icon-exit" onClick={()=>{
            if(localStorage.getItem("valoracion")==="0"){
                history.push("/evaluacion");
            }
            else{
                props.manageLogout();
            }
            }}> Salir</span></li>)
    }
    else{
        menuOptions.push(<li key="Login"  onClick={()=>{history.push("/login")}}><span className="icon-enter"/><p className="menu-icon"> Login</p></li>)
        menuOptions.push(<li key="Registro" onClick={()=>{history.push("/registro")}}><span className="icon-pencil"/><p>Regístrate</p></li>)
        menuOptions.push(<li key="Traductor" onClick={()=>{alert("This is in another language")}}><span className="icon-google-translate"/><p>Traductor</p></li>)
        menuOptions.push(<li key="Terminos" onClick={()=>{history.push("/terminos")}}><span className="icon-file-text2"/><p>Términos</p></li>)
        menuOptions.push(<li key="Salida" onClick={()=>{history.push("/salida")}}><span className="icon-exit"/><p>Salir</p></li>)
    }

    const menuHamburguesa=<nav>
        <input type="checkbox" id="check"/>
        <label htmlFor="check" className="checkbtn">
            <img src={menAzul} alt="Botón menú azul"/>
        </label>
        <ul>{menuOptions}</ul>
    </nav>

    const FuncionBotones=(i)=>{
        if(i===0){
            history.push("/escaner")
        }
        if(i===1){
            history.push("/maps")
            //window.location.href='/buscar';           < ---------------PONER LA RUTA CORRECTA
        }
        if(i===2){
            alert("Has pulsado el boton sos");
            //window.location.href='/sos';         <------------------PONER LA RUTA CORRECTA
        };
    }

    return(
        <div className="home_page">
            <div className="cabecera">
                <div className="menu">{menuHamburguesa}</div>
                <div className="info"><Link to="/guia"><img src={gris} alt="Modo gris"/></Link></div>
            </div>
            <div className="logo"><img src={logo} alt="Logo Applergic"/></div>
            <div className="arrayBotones">{arrayBotones}</div>
            <div className="botones_inferiores">
                <span className="icon-home iconBottom iconBlue" onClick={()=>{history.push("/homepage")}}/>
                <span className="icon-star-empty iconBottom" onClick={()=>{history.push("/favoritos")}}/>
                <span className="icon-book iconBottom" onClick={()=>{alert("¿De qué has hablado")}}/>
                <span className="icon-compartir iconBottom" onClick={()=>{alert("Compartiendo...")}}/>
            </div>            
        </div>
    )
}
