import React from 'react';
import './Evaluacion.scss';
import { Link } from 'react-router-dom';
import { Stars } from '../Stars/Stars';
import icon from '../../assets/images/logoApplergicFigurasGiro.png';
import axios from 'axios';

export const Evaluacion = function(props){
    let token = localStorage.getItem("token");
    let valoracion = localStorage.getItem("valoracion");
    let id = localStorage.id
    function action(valoracion){
        localStorage.setItem("valoracion",valoracion)
        let valor = { id, valoracion }
        axios.put("http://localhost:9000/usuario/perfil",valor,{headers:{"Authorization": `Bearer ${token}`}})
        .then((res)=>console.log(res.data),(error)=>alert(error))
    }
    return(
        <div className="block">
        <div className="All">
            <div className="stepHeader">
                <table>
                    <tbody>
                        <tr>
                            <td className="backLink"><span className="smallLink"><Link to="/homepage">&lt; Volver</Link></span></td>
                            <td className="stepReg"><span className="Paso">Evaluación</span></td>
                            <td className="rightIcon"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="Evaluacion">
                <figure>
                    <img className="icono" src={icon} alt="Icono de Applergic"/>
                    <figcaption className="caption bold">
                        <p>¡Gracias por usar Applergic!</p>
                        <p>Por favor, evalúa tu experiencia.</p>
                    </figcaption>
                </figure>
                <Stars value={valoracion} function={action} click="true"/>
            </div>
            <div><span className="smallLink bold"><Link to="/sugerencias">Enviar sugerencias</Link></span></div>
            <div><span className="smallLink bold" onClick={()=>props.manageLogout()}>Finalizar sesión</span></div>
        </div>
        </div>
    )
}