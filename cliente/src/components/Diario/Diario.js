import React, { useState } from 'react';
import './Diario.scss';
import history from '../History/History'
import axios from 'axios';


function Diario(props) {

    const [muestra, setMuestra] = useState([]);
    const [entradas, setEntradas] = useState([]);
    //let entradas = []

    let diary = localStorage.diario
    diary = diary.split(',')

    //llamar axios para obtener la lista de diario de un usuario en concreto 

            axios.post('http://localhost:9000/diario/filtrar', {diary}, { headers: { 'Authorization': `Bearer ${localStorage.token}` } })
                .then((res) => {
                
                    if (entradas !== res.data) setEntradas(res.data)
                    //entradas.push(res)
 
                })

    let l = entradas.length
    console.log(entradas)
    let muestrario = []
    for (let i = 0; i < l; i++) {
        let datos = entradas[i]
        console.log(datos)
        let entrada = datos.diario

        let titulo = entrada.titulo
        let tipo = entrada.tipo
        let texto = entrada.texto
        let sobre = entrada.sobre
        let fecha = entrada.fechaCreacion

        let objeto = sobre.tipo
        let objetoId = sobre.id
        let objetoOk = sobre.ok

        let sujeto = datos.producto

        let clSimbolo, clMarco, clIcono;

        if (objetoOk === 'null') {
            clSimbolo = 'noInfo simbolo';
            clIcono = 'icon-interrogacion'
            clMarco = 'frameNoInfo allMarcos'
        }
        else if (objetoOk === 'true') {
            clSimbolo = 'okay simbolo';
            clIcono = 'icon-checkmark2'
            clMarco = 'frameOk allMarcos'
        }
        else {
            clSimbolo = "wrong simbolo"
            clIcono = 'icon-cross'
            clMarco = 'frameWrong allMarcos'
        }

        let foto = 'http://localhost:9000/' + sujeto.foto;
        //let muestraInit = muestra
        let circulo = <span className={clSimbolo}><span className={clIcono}></span></span>
        let imagen = <figure className={clMarco}><img src={foto} alt='' /></figure>
        let m = <div className='muestra'>
            <div className='imagenProductoMuestra'>
                {circulo}
                {imagen}
            </div>
            <div>
                <p>{fecha}</p>
                <p>{titulo}</p>
                <p>Notas: {texto}</p>
            </div>
        </div>

        muestrario.push(m)

        
        //setMuestra(muestraInit)
        //console.log(muestra)

    }

    if (muestra !== muestrario) setMuestra(muestrario)

    return (

        <div>
            <div className="cabeceraDiario">
                <span className="icon-calendar iconos" onClick={() => { history.push("/") }} alt=''></span>
                <span className='icon-filter iconos' onClick={() => { history.push("/") }} alt=''></span>
                <span className='icon-x iconos' onClick={() => { history.push("/homepage") }} alt=''></span>
            </div>

            <div className='titulos'>
                <p className='tituloDiario'>¿Incluimos la selección en tu Diario?</p>
                <p className='subtituloDiario'>Añade tus comentarios para completar tu información.</p>
            </div>

            <div>
                {muestra}
            </div>

            <div className='Save'>
                <button className="guardar" onClick={() => { history.push("/") }}
                    src="./assets/img/primary.png" >Guardar</button>
            </div>
            <div className='Generar'>
                <a className='genInform' onClick={() => { history.push('/') }}>Generar informe</a>
            </div>

        </div>
    )





}
export default Diario;