import React, { useState } from 'react';
import axios from 'axios';
import history from '../History/History'
import { v4 as uuidv4 } from 'uuid';
import './DiarioEscribir.scss';



function DiarioEscribir(props){

    const [imagenProd, setImagenProd] = useState (null)

    const Escribir = ()=>{
        
        //crear un obj json que siga el patron del modelo
        //en el json meter los datos necesarios(titulo, tipo, texto, sobre, id(usuario))
        var entrada = {id:'', titulo:'', tipo:'', texto:'', sobre:'', idUsuario:''}
        entrada.id = uuidv4()
        entrada.titulo = sessionStorage.nombre;
        entrada.tipo = 'Texto';
        entrada.texto = document.getElementById('textoProducto').value
        entrada.sobre = `{"tipo":"Producto", "id":"${sessionStorage.id}", "ok":${sessionStorage.ok}}`
        entrada.idUsuario = localStorage.id

        let diary = localStorage.diario
        if(diary === '') diary = []
        else {diary = diary.split(',')
        }
        diary.push(`${entrada.id}`)
        localStorage.setItem('diario',diary)

        axios.put('http://localhost:9000/usuario/perfil', {id:localStorage.id, diario:diary}, {headers:{'Authorization':`Bearer ${localStorage.token}`}})

        axios.post('http://localhost:9000/diario', entrada, {headers:{'Authorization':`Bearer ${localStorage.token}`}})
    
    }


    const imagenProd2 = ()=>{

        //let foto2 = sessionStorage.getItem('foto')
        let foto = 'http://localhost:9000/'+sessionStorage.foto

        let objetoOk = sessionStorage.ok
        let clSimbolo, clMarco, clIcono;

        if(objetoOk === 'null'){
            clSimbolo = 'noInfo simbolo';
            clIcono = 'icon-interrogacion'
            clMarco = 'frameNoInfo allMarcos'
        }
        else if(objetoOk === 'true'){
            clSimbolo = 'okay simbolo';
            clIcono = 'icon-checkmark2'
            clMarco = 'frameOk allMarcos'
        }
        else {
            clSimbolo = "wrong simbolo"
            clIcono = 'icon-cross'
            clMarco = 'frameWrong allMarcos'
        }


                    
        let circulo2 = <span className={clSimbolo}><span className={clIcono}></span></span>
        let imagen2 = <figure className={clMarco}><img src={foto} alt=''/></figure> 
        let imageProd = <div className='muestra2'>
                            <div className='imagenProductoMuestra'>
                                {circulo2}
                                {imagen2} 
                            </div>
                        </div> 
        
        setImagenProd(imageProd)

    }

    if(imagenProd === null) imagenProd2()
    

    return(


        <div className='diarioEscribir'>
            <div className="stepHeader">
                <table>
                    <tbody>
                        <tr>
                            <td className="backLink"><span className="smallLink" onClick={()=>{history.push("/resultados")}}>&lt; Volver</span></td>
                            <td className="stepReg"><span className="Paso"></span></td>
                            <td className="rightIcon"><span className="icon-x" onClick={()=>{history.push("/homepage")}}></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className='textoDiario2'>
                <p className='titulotext2'>Añade una nota al producto que será enviado al diario</p>

                {imagenProd} 
                
            </div>
            <div className='cuadroBoton'>
                <input className='textarea2' type="textarea"  placeholder="Escribe aquí el texto..." id="textoProducto"/>
                <button className='botonDiaEscribir' onClick={()=>{Escribir(); history.push('/Diario')}}>Guardar</button>
            </div>
       </div>
    )

}

export default DiarioEscribir;