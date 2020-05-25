import React from 'react';
import './Terminos.scss';
import history from '../History/History'

export const Terminos = function(props){
    const Terminos = {"Alérgeno": "Sustancia capaz de provocar una reacción alérgica en base a activar el sistema inmunológico y desencadenar cuadros inflamatorios alérgicos.",
                      "Alergia": "Reacción anormal del organismo ante el contacto con una sustancia procedente del exterior, consistiendo en una actuación exagerada del sistema inmunológico.",
                      "Anticuerpo": "Proteína fabricada por el sistema inmunitario, capaz de neutralizar o destruir elementos extraños.",
                      "Antihistamínico":"Medicamento usado para tratar los síntomas de la alergia, contrarrestando el efecto de la proteína histamina.",
                      "Contacto de emergencia":"Persona de confianza con la que el sistema se pondrá en contacto si el alérgico sufre de una condición que requiera de atención médica.",
                      "Corticoides":"Medicamento usado para tratar los síntomas de inflamación de las alergias.",
                      "Histamina":"Proteína que modula la reacción del sistema inmunológico a las sustancias externas. Su presencia permite medir el grado de sensibilidad de dichas reacciones.",
                      "Hipersensibilidad":"Respuesta exagerada y anormal del sistema inmunitario a sustancias que habitualmente no causan daño en individuos no alérgicos.",
                      "Inmunoterapia":"Terapia para habituar al sistema inmunológico a la presencia de un alérgeno mediante la administración de dosis crecientes de dicho alérgeno para producir una tolerancia inmunológica y clínica.",
                      "Intolerancia":"Incapacidad del cuerpo para procesar o digerir un compuesto alimenticio concreto, causando problemas digestivos.",
                      "Tolerancia":"Disminución del efecto de una sustancia determinada tras la administración repetida, obligando a un aumento de la dosis para obtener el mismo efecto."
                    }
    var descripciones = []
    for(let [termino,descripcion] of Object.entries(Terminos)){
        descripciones.push(<p key={termino} className="Termino"><span className="bold">{termino}</span> {descripcion}</p>)
    }

    return(
        <div className="block">
            <div className="Todo">
                <div className="stepHeader">
                    <table>
                        <tbody>
                            <tr>
                                <td className="backLink"><span className="smallLink" onClick={()=>{history.push("/homepage")}}>&lt; Volver</span></td>
                                <td className="stepReg"><span className="Paso">Términos</span></td>
                                <td className="rightIcon"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="Terminos">
                    {descripciones}
                </div>
            </div>
        </div>
    )
}