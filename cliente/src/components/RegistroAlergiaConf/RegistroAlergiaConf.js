import React from 'react';
import './RegistroAlergiaConf.scss'

export const RegistroAlergiaConf = function(props){
    const perfil = props.perfil
    const alergias = perfil.alergias
    const change = props.change
    const act = props.action
    const registrar = props.registrar
    var drawAlergias = []
    function toggleAlergia(list,alergia){
        var i = list.indexOf(alergia)
        if(i === -1) list.push(alergia)
        else list.splice(i,1)
        list.sort()
        change({target: {name: "alergias",value:list}})
    }
    
    alergias.forEach(alergia=>{
        let k = `key${alergia}`
        let id = `id${alergia}`
        drawAlergias.push(<span className="alergia activeAlergia" key={k} id={id} 
            onClick={($event)=>{
                toggleAlergia(alergias,alergia)
            }}>{alergia}</span>
        )
    })
    drawAlergias.push(<span className="alergia" key="back" id="back" onClick={()=>act(false)}>Añadir nuevos</span>)
    return(
        <div className="Form">
            <div className="overHead">
                <span className="Title">Confirma tu selección.</span>
                <span className="subTitle">A continuación te resumimos los alimentos más peligrosos para ti.</span>
                <span className="subTitle">Marca para deseleccionar o añadir uno nuevo.</span>
            </div>
            <div className="bodyAlergias" key="drawAlergias">{drawAlergias}</div>
            <button className="Link activeButton" onClick={()=>{registrar();act(true)}}>Confirmar alergias</button>
        </div>
    )
}