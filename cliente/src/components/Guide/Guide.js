import React from 'react';
import './Guide.scss';
import{
    Link
  } from 'react-router-dom';
import logo from '../../assets/img/Home/logoApplergicFinal.png'
  
export const Guide = function(){
    let integrantes={diseño:["David Franco"],
                    programacion:["Alexander David Valladares Cueva","Juan José Senit Velasco","Miguel Lallena Arquillo","Miguel Portero Ruiz"]};
    
    let matrizDis=[];
    for(let i=0;i<integrantes.diseño.length;i++){
        let key = `Diseñador-${i}`
        matrizDis.push(<p key={key}>{integrantes.diseño[i]}</p>)
    } 
    let matrizProg=[];
    for(let i=0;i<integrantes.programacion.length;i++){
        let key = `Programador-${i}`
        matrizProg.push(<p key={key}>{integrantes.programacion[i]}</p>)
    }
    return(
        <div className="acerca_de">
            <div className="stepHeader">
                <table>
                    <tbody>
                        <tr>
                            <td className="backLink"><span className="smallLink"><Link to="/homepage">&lt; Volver</Link></span></td>
                            <td className="stepReg"><span className="Paso">Acerca de</span></td>
                            <td className="rightIcon"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="logo"><img src={logo} alt="Logo Applergic"/></div>
            <div className="Integrantes">
                <div className="Trabajador">
                    <div className="subtitle">Diseñador/es Ux/Ui</div>
                    <div className="nombres">{matrizDis}</div>
                </div>
                <div className="Trabajador">
                    <div className="subtitle">Programador/es</div>
                    <div className="nombres">{matrizProg}</div>
                </div>
            </div>
        </div>
            
    );
}