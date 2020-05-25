import React, { useState } from 'react';
import './Escaner.scss'
import history from '../History/History'
import codQR from "../../assets/images/imgQr.png"
import codNFC from "../../assets/images/imgNfc.png"
import axios from "axios"

export const Escaner = function (props) {

    const [estado, setEstado] = useState(0)
    const texto1 = ["Tan solo tienes que centrar el ",
        "Tan solo tienes que centrar el código ",
        "Tan solo tienes que aproximar tu móvil al símbolo "
    ]
    const texto2 = [" del producto en el recuadro.",
    " del producto en el recuadro.",
    " de la etiqueta digital del producto."
    ]
    const negrita = ["código de barras", "QR", "NFC"]
    let texto = []
    for (let i = 0; i < 3; i++) {
        let key = `texto${i}`
    let text = <p className="tansolo" key={key}>{texto1[i]}<span className="negrita">{negrita[i]}</span>{texto2[i]}</p>
    texto.push(text)
    }
    
    let imagenCB = <div><input id="codigoBarras" type="numeric"/> <button className="botonCB" onClick={()=>{lecturaCodigo("BC")}}>Enviar</button></div>
    let imagenQR = <figure><img src={codQR} alt="Imagen"/></figure>
    let imagenNFC = <figure><img src={codNFC} alt="Imagen"/></figure>

    const escaneo = [imagenCB, imagenQR, imagenNFC]
    const botones = []
    const txtBotones = ["Código de barras", "Código QR", "NFC"]
    const icono = ["icon-barcode", "icon-qrcode", "icon-smartphone"]
    
    for (let i = 0; i < 3; i++) {
        let cl = "icono "
        if (i === estado) {
            cl += "iconoOn "
        } else {
            cl += "iconoOff "
        }
        let key = `boton${i}`
        let boton = <span className={cl}><span className={icono[i]}></span></span>
        let conjunto = <div className="botonC" key={key} onClick={() => {
            setEstado(i)
    }}>{boton} <p>{txtBotones[i]}</p></div>
        botones.push(conjunto)
    }

    function lecturaCodigo(tipo){
        if (tipo === "BC"){
            let codigo = parseFloat(document.getElementById("codigoBarras").value)
            let dato = {"BC":codigo}
            axios.post("http://localhost:9000/producto/filtrar",dato)
            .then((res)=>{
                let producto = res.data
                sessionStorage.setItem('id',producto.id)
                sessionStorage.setItem("nombre", producto.nombre)
                sessionStorage.setItem("compania", producto.compania)
                sessionStorage.setItem("ingredientes", producto.ingredientes)
                sessionStorage.setItem("alergenos", producto.alergenos)
                sessionStorage.setItem("foto", producto.foto)
                history.push("/resultados")
            })
        } 
    }

    return (
        <div className="conjunto">
            <div className="stepHeader">
                <table>
                    <tbody>
                        <tr>
                            <td className="backLink"></td>
                            <td className="stepReg"><span className="Paso"></span></td>
                            <td className="rightIcon"><span className="icon-cross salida" onClick={() => { history.push("/homepage") }}></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="cuerpo">
                <p className="titulo">Escaneando...</p>
                {texto[estado]}
            </div>
            <div id="escaneando">
                {escaneo[estado]}
            </div>
            <div id="buttons">
                {botones}
            </div>
        </div>
    );
}

