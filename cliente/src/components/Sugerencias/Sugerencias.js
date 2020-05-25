import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Sugerencias.scss'

export const Sugerencias = function(props){
    const [sugerencia,setSugerencia] = useState("")

    let sugestion = <input className="sugerencia" type="textarea" 
    onChange={($entry)=>setSugerencia($entry.target.value)} value={sugerencia}></input>
    let botton = <Link to="/"><button className="button">Enviar sugerencia</button></Link>

    return(
        <div className="All">
            <div className="stepHeader">
                <table>
                    <tbody>
                        <tr>
                            <td className="backLink"><span className="smallLink"><Link to="/">&lt; Volver</Link></span></td>
                            <td className="stepReg"></td>
                            <td className="rightIcon"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="overHead">
                <span className="Title">Sugerencias</span>
                <span className="subTitle">Haznos una sugerencia que nos permita mejorar nuestro servicio.</span>
            </div>
            {sugestion}
            {botton}
        </div>
        
    )
}