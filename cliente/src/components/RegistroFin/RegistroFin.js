import React from 'react';
import ok from '../../assets/images/ok.jpg';
import './RegistroFin.scss';
import axios from 'axios';
import history from '../History/History'

export const RegistroFin = function(props){
    const email = props.email
    const password = props.password

    function loadUser(){
        let login = {email,password}
        axios.post("http://localhost:9000/usuario/login",login)
        .then((res)=>{
            if(res.data.token){
                props.setToken(res.data.token)
                for(let [key,value] of Object.entries(res.data.user)){
                    if(key !== "currentToken" && key !== "fechaCreacion"){
                        localStorage.setItem(key,value)
                    }
                }
                history.push("/escaner")
            }
        })
    }

    return(
        <div className="Form">
            <figure>
                <img src={ok} alt="¡OK!"/>
                <figcaption>Hemos terminado ya, puedes escanear tu primer producto</figcaption>
            </figure>
            <button className="Link activeButton" onClick={()=>{loadUser()}}>Escanear un producto</button>
        </div>
    )
}