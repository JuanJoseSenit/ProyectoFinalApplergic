import React, { Component } from "react";
import { googleTranslate } from "../Traductor/googleTranslator";
import './diarioLeer.scss';
import history from "../History/History"

class DiarioLeer extends Component {

    date = new Date(sessionStorage.getItem("fecha"));
    day = this.date.getDate();
    month = this.date.getMonth();
    year = this.date.getFullYear();
    weekday = this.date.getDay();
    semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    
    alergias = localStorage.alergias
    alergias = this.alergias.split(",")
    alergias = this.alergias.join(", ")
    isOk = sessionStorage.getItem("objetoOk")
    apt = this.isOk ? "Nuevos productos APTOS incluidos en tu diario.": "Nuevos productos NO APTOS incluidos en tu diario."

    state = {
    fecha: `Fecha: ${this.day} de ${this.meses[this.month]} de ${this.year}`,
    fecha2: `${this.semana[this.weekday]}, ${this.day}/${this.month + 1}/${this.year}`,
    mes: `${this.meses[this.month]} de ${[this.year]}`,
    titulo: sessionStorage.getItem("titulo"),
    notas: "Notas: " + sessionStorage.getItem("notas"),
    ingredientes: "Ingredientes: " + sessionStorage.getItem("ingredientes"),
    foto: sessionStorage.getItem("foto"),
    objetoOk: this.isOk,
    nombre: "Nombre: " + localStorage.nombre,
    alergias: "Alérgico a: " + this.alergias,
    aptitud: this.apt,
    lenguaje: "es",
    languageCodes: []
};

componentDidMount() {
    // carga todas las opciones de lenguajes desde Google Translator

    googleTranslate.getSupportedLanguages("es", function (err, languageCodes) {
        setLanguageCodes(languageCodes);
    });

    const setLanguageCodes = languageCodes => {
        this.setState({ languageCodes });
    };
}

traductor(texto, lenguaje, clave) {
    const setState = this.setState.bind(this)
    let resultado = ""
    googleTranslate.translate(texto, lenguaje, async function (err, translation) {
        let valor = translation.translatedText
        setState({ [clave]: valor })
        console.log(clave, valor)
    }
    )
}

changeHandler(lengua) {
    let fechaIni = this.state.fecha
    let fecha2Ini = this.state.fecha2
    let mesIni = this.state.mes
    let nombreIni = this.state.nombre
    let alergiasIni = this.state.alergias
    let aptitudIni = this.state.aptitud
    let ingredientesIni = this.state.ingredientes
    let tituloIni = this.state.titulo
    let notasIni = this.state.notas
    if (this.state.lenguaje !== lengua) {
        this.traductor(fechaIni, lengua, "fecha")
        this.traductor(ingredientesIni, lengua, "ingredientes")
        this.traductor(tituloIni, lengua, "titulo")
        this.traductor(notasIni, lengua, "notas")
        this.traductor(nombreIni, lengua, "nombre")
        this.traductor(alergiasIni, lengua, "alergias")
        this.traductor(aptitudIni, lengua, "aptitud")
        this.traductor(fecha2Ini, lengua, "fecha2")
        this.traductor(mesIni, lengua, "mes")
        this.setState({ lenguaje: lengua })
    }
}

render() {
    const { fecha,
        fecha2,
        mes,
        titulo,
        notas,
        ingredientes,
        foto,
        objetoOk,
        nombre,
        alergias,
        aptitud,
        lenguaje,
        languageCodes } = this.state;


    let clSimbolo, clMarco, clIcono;
    let isApto = "";

    if (objetoOk === 'null') {
        clSimbolo = 'noInfo simbolo';
        clIcono = 'icon-interrogacion'
        clMarco = 'frameNoInfo allMarcos'
    }
    else if (objetoOk === 'true') {
        clSimbolo = 'okay simbolo';
        clIcono = 'icon-checkmark'
        clMarco = 'frameOk allMarcos'
    }
    else {
        clSimbolo = "wrong simbolo"
        clIcono = 'icon-cross'
        clMarco = 'frameWrong allMarcos'
        isApto = 'NO '
    }
    let circulo = <span className={clSimbolo}><span className={clIcono}></span></span>
    let imagen = <figure className={clMarco}><img src={foto} alt='' /></figure>

    return (
        <div className="traductor">

            <div className="stepHeader">
                <table>
                    <tbody>
                        <tr>
                            <td className="backLink"><span className="smallLink" onClick={() => { history.push("/diario") }}>&lt; Volver</span></td>
                            <td className="stepReg"></td>
                            <td className="rightIcon"><span className="icon-cross" onClick={() => { history.push("/homepage") }}></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='titulos'>
                <p className='tituloDiario'>Este es el informe basado en tu Diario</p>
                <p className='subtituloDiario'>Actividad del mes de {mes}</p>
            </div>
            {/* select box */}
            <p>
                <select
                    className="select-language"
                    value={lenguaje}
                    onChange={e => this.changeHandler(e.target.value)}
                >
                    {languageCodes.map(lang => (
                        <option key={lang.language} value={lang.language}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </p>

            <div className="datos">
                <p className="nombre">{nombre}</p>
                <p className="alergenos">{alergias}</p>
                <p className="fecha">{fecha}</p>
                <p className="nueProd">{aptitud}</p>
            </div>

            <div className="productoDiario">
                <div className="imagenDatos2">
                    <div className='imagenProductoDiario'>
                        {circulo}
                        {imagen}
                    </div>
                    <div className="datosProductoDiario">
                        <p>{fecha2}</p>
                        <p>{titulo}</p>
                        <p>{notas}</p>
                    </div>
                </div>

                <div className="ingredientesDiario">
                    <p>{ingredientes}</p>
                </div>

            </div>

        </div>
    )
}
}

export default DiarioLeer;