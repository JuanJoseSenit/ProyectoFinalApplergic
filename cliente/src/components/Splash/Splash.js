import React from 'react';
import './Splash.scss';
import group from '../../assets/img/splash/group.png';
import logo from '../../assets/img/splash/logoApplergicRetocada.png';
import history from '../History/History';
import axios from 'axios';

export const Splash = function(props){
    if(localStorage.token){
        let token = localStorage.token;
        axios.get("http://localhost:9000/usuario/vuelta",{headers:{"Authorization":`Bearer ${token}`}})
            .then((res)=>{
                if(res.status === 200){
                    let user = res.data.result;
                    for(let [key,value] of Object.entries(user)){
                        if(key!=="fechaCreacion" && key !== "currentToken"){
                            localStorage.setItem(key,value)
                        }
                    }
                }
            },(err)=>{
                localStorage.clear()
            })
    }
    return(
        <div className="pantalla_splash" onClick={()=>{
            let token = localStorage.token
            if(token){
                history.push("/homepage")
            }else{
                history.push("/onboarding")
            }
            }}>
            <figure className="figura_titulo"><img className="img_responsive" src={group} alt="Imagen elemento grupo"/></figure>
            <figure className="figura_logo"><img className="img_responsive" src={logo} alt="Imagen Giro"/></figure>
        </div>
    );
}