import React, { useState } from 'react';
import './goodResults.scss';
import history from '../History/History'
import volver from '../../assets/images/volver.png';
import close from '../../assets/images/close.png';
import axios from 'axios'

function GoodRes(props) {
    const [arrayFav, setArrayFav] = useState(['Cola Cao']);
    const [diary, setDiary] = useState(['diario']);
    
    const buttonsValue = [{ class: "icon-star-empty btn-favourite", id:"favourite"},
                            { class: "icon-book btn-favourite", id:"diario" },
                            { class: "icon-compartir btn-share", id:'compartir'}];

    let clSimbolo, clMarco, clIcono, textoApto;

    //const alergenos = sessionStorage.alergenos// sessionStorage: guardar datos hasta cerrar navegador
    const alergias = localStorage.alergias //localStorage: sirve para guardar el perfil a largo plazo aunque se cierre el navegador

    let alergenos = [];
    if (sessionStorage.alergenos.indexOf(",") === -1){
        alergenos.push(sessionStorage.alergenos)
    }
    else{
        let valius = sessionStorage.alergenos.toString()        
        for (let a of valius.split(',')){
            alergenos.push(a)
        }
    }
    
    let isOK;

    if(alergenos.length === 0 || (alergenos.length === 1 && alergenos[0] === '')){
        clSimbolo = 'noInfo simbolo';
        clIcono = 'icon-interrogacion'
        clMarco = 'frameNoInfo allMarcos'
        textoApto = 'Lo sentimos, no hay datos suficientes para poder valorar este producto.'
        console.log('no hay alergenos');
        isOK = null;
    }
    else{
        let intersection=[];
        for (let a of alergenos){
            if (alergias.indexOf(a) !== -1) intersection.push(a)
        }
        let l = intersection.length;
        if (l === 0){
            clSimbolo = 'okay simbolo';
            clIcono = 'icon-checkmark2'
            clMarco = 'frameOk allMarcos'
            textoApto = 'Este producto es apto para ti.'
            isOK = true;
        }
        else{
            clSimbolo = "wrong simbolo"
            clIcono = 'icon-cross'
            clMarco = 'frameWrong allMarcos'
            textoApto = 'Este producto NO es apto para ti. Contiene '
            isOK = false;
            if(l === 1){
                textoApto += intersection[0]
            } 
            else{
                for(let i = 0; i < l -1; i++){
                    textoApto += intersection[i]+', ';
                }
                textoApto += intersection[l-1]
            }
        }
    }
    sessionStorage.ok = isOK

       
    let circulo = <span className={clSimbolo}><span className={clIcono}></span></span>
    let imagen = <figure className={clMarco}><img src={"http://localhost:9000/"+sessionStorage.foto} alt=''/></figure>
    console.log(imagen)

    //consultar localStorage para que devuelva la lista de favoritos 
    //buscar id del producto en la lista de favoritos
    //si está pasar una clase que ponga la fuente en azul y si no pasar clase en negro 

    let listFavoritos = localStorage.favoritos
    let estrella;
    let isFav;

    if(listFavoritos.indexOf(sessionStorage.id) === -1){
        estrella = 'icon-star-empty btn-favourite isFav'
        isFav = false
    }
    else{
        estrella = 'icon-star-empty btn-favourite isNotFav'
        isFav = true
    }

    let favorito = <span key="favorito" className={estrella} onClick={()=>{if(isFav){newFavorito(sessionStorage.id)}}}></span>//sirve para activar la función de favorito
    
    function newFavorito(id){
        let lista = JSON.parse(localStorage.favoritos) //transforma la cadena de caracteres que contiene la lista de favoritos en JSON
        lista.Producto[id] = {fecha:Date.now(), ok:isOK}
        localStorage.favoritos = JSON.stringify(lista)
        axios.put('http://localhost:9000/usuario/perfil', {id:localStorage.id, favoritos:lista}, {headers:{'Authorization':`Bearer ${localStorage.token}`}})
        .then((res)=>console.log(res.data), (error)=>alert(error))
    }

    const ButtonsFunct = (i) => {
        if (i === 0) {
            newFavorito(sessionStorage.id)
            history.push('/favoritos')
        }
        if (i === 1) {
            history.push('/DiarioEscribir')
        }
        if (i === 2) {
            alert("compartir con...");
        };
    }

    let arrayBotones = [];
    arrayBotones.push(<div key="0"><div className="botones">{favorito}</div></div>)
    for (let i = 1; i < buttonsValue.length; i++) {
        arrayBotones.push(
            <div key={i}>
                <div className="botones">
                    <span className={buttonsValue[i].class} onClick={() => {ButtonsFunct(i)}}>
                        {buttonsValue[i].value}</span> 
                </div>
            </div>)
    }
    return (

        <div>
            <div className="cabecera">
                <img className='atras' onClick={()=>{history.push("/escaner")}} src={volver} alt=''/>
                <img className='equis' onClick={()=>{history.push("/homepage")}} src={close} alt=''/>
            </div>
            <div className="texto">
                <p className="resultado">Aquí tienes el resultado</p>
                <p className="apto">{textoApto}</p>
            </div>

            <div className="imagen_botones">
                <table>
                    <tbody>
                        <tr>
                            <td className="backLink"></td>
                            <td className="centro">
                                <div className='imagenProducto'>
                                    {circulo}
                                    {imagen} 
                                </div>                          
                            </td>
                            <td className="three-buttons">
                                {arrayBotones}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="datas" id='buen-producto'>
                <p className="title">{sessionStorage.nombre}</p>
                <p className="marca">{sessionStorage.compania}</p>
                <p className="ingredientes" id='ingredientes'><strong>Ingredientes</strong>: {sessionStorage.ingredientes} </p>
            </div>

            <div className='Scann'>
                <button className="escanOtro"  onClick={()=>{history.push("/escaner")}} 
                src="./assets/img/primary.png" >Escanea otro producto</button>
            </div>
        </div>
    );

}

export default GoodRes;