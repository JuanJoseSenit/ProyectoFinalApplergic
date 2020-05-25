import React from 'react';
import './RegistroAlergia.scss'

export const RegistroAlergia = function(props){
    const perfil = props.perfil
    const alergias = perfil.alergias
    const change = props.change
    const listAlergias = props.lista
    const act = props.action
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
        list.sort()
        change({target: {name: "alergias",value:list}})
    }
    function toggleHead(letra){
        document.getElementById(`idHead${letra}`).classList.toggle("activeAlergia",checkLetra(letra))
        document.getElementById(`head${letra}`).classList.toggle("activeAlergia",checkLetra(letra))
    }
    var header = []
    for (let key in listAlergias){
        let k = `head${key}`
        let id = `idHead${key}`
        let clname = checkLetra(key) ? "letra activeAlergia":"letra"
        header.push(<a className={clname} id={id} key={k} href={`#${k}`}><span id={key}>{key}</span></a>)
    }
    for(const [key,value] of Object.entries(listAlergias)){
        let keyHead = `head${key}`
        let keyAls = `als${key}`
        let keyAll = `all${key}`
        let clname = checkLetra(key) ? "letra activeAlergia":"letra"
        let head = <div key={keyHead} className="headLetra">
            <span name={keyHead} id={keyHead} className={clname}>
                {key}
            </span>
            <a href="#top" className="topLink">&#8896;</a>
        </div>
        let inter = [];
        for(const [letter,aler] of Object.entries(value)){
            let k = `${key}${aler}`
            let clname = alergias.indexOf(aler) !== -1 ? "alergia activeAlergia":"alergia inactiveAlergia";
            inter.push(
                <span className={clname} key={k} id={letter} onClick={($event)=>{
                    $event.target.classList.toggle("activeAlergia")
                    $event.target.classList.toggle("inactiveAlergia")
                    toggleAlergia(alergias,aler)
                    toggleHead(key)
                }}>{aler}</span>
            )
        }
        let als = <div className="alergiaPorLetra" key={keyAls}>{inter}</div>
        let all = <div className="alergiaLetra" key={keyAll}>{head}{als}</div>
        drawAlergias.push(all)
    }
    return(
        <div className="Form">
            <div className="overHead">
                <span className="Title">Ahora selecciona tus alergias e intolerancias.</span>
                <span className="subTitle">Los elementos marcados serán identificados en tus búsquedas como peligrosos para ti.</span>
            </div>
            <span name="top"></span>
            <div className="headerAlergias" key="header">{header}</div>
            <div className="bodyAlergias" key="drawAlergias">{drawAlergias}</div>
            <button className="Link activeButton" onClick={()=>{act(true)}}>Guardar alergias</button>
        </div>
    )
}