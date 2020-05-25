import React, {useState} from 'react';
import './Registro.scss';
import { RegistroPersonal } from '../RegistroPersonal/RegistroPersonal'
import { RegistroContacto } from '../RegistroContacto/RegistroContacto'
import { RegistroAlergia } from '../RegistroAlergia/RegistroAlergia'
import { RegistroAlergiaConf } from '../RegistroAlergiaConf/RegistroAlergiaConf'
import { RegistroFin } from '../RegistroFin/RegistroFin'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import history from '../History/History'

export const Registro = function(props){
    const [perfil,setPerfil] = useState({id:"",nombre:"",email:"",telefono:"",password:"",
              contactoNombre:"",contactoEmail:"",contactoTelefono:"",
              aseguradora:"",poliza:"",alergias:[],
              favoritos:'{"Producto":{},"Restaurante":{},"Comercio":{}}'})

    const [foto,setFoto] = useState()

    const changePerfil = function(event){
        let name = event.target.name
        let value = event.target.value
        
        if(name === "AsegPoliza"){
            let texSp = value.split("/")
            texSp[0].trim()
            setPerfil({...perfil,aseguradora:texSp[0]})
            if(texSp.length>1){
                texSp[1].trim()
                setPerfil({...perfil,poliza:texSp[1]})
            }
        }
        else if(name === "foto"){
            setFoto(event.target.files[0])
        }
        else{
            setPerfil({...perfil,[name]:value})
        }
    }
    const [phase,setPhase] = useState(0)
    const allergy = props.listAlergias
    const leftIcon = [<span className="smallLink" onClick={()=>{history.push("/login")}}>&lt; Volver</span>,<span className="smallLink" onClick={()=>{changePage(false)}}>&lt; Volver</span>,<span className="smallLink" onClick={()=>{changePage(false)}}>&lt; Volver</span>,"",<span className="smallLink" onClick={()=>{changePage(false,2)}}>&lt; Volver</span>];
    const paso = [1,2,3,3,4]
    const rightIcon = [<span className="icon-home"></span>,"",<span className="icon-cross" onClick={()=>{noAlergias(); changePage(false)}}></span>,""];
    function changePage(n,step=1){
        if(n) {
            setPhase(phase+step)
        }
        else {
            setPhase(phase-step)
        }
    }
    function noAlergias(){
        changePerfil({target: {name: "alergias",value:[]}})
    }
    function registrarUsuario(){
        perfil.id = uuidv4();
        let fd = new FormData();
        for(let [key,value] of Object.entries(perfil)){
            fd.append(key,value)
        }
        fd.append('foto',foto)
        axios.post("http://localhost:9000/usuario/registro",fd)
            .then(res=>{
                let pswd = perfil.password
                setPerfil(res.data);
                setPerfil({...perfil,password:pswd})
            })
    }
    const show = [<RegistroPersonal perfil={perfil} foto={foto} setFoto={setFoto} change={changePerfil.bind(this)} action={changePage.bind(this)}/>,
        <RegistroContacto perfil={perfil} change={changePerfil.bind(this)} action={changePage.bind(this)}/>,
        <RegistroAlergia perfil={perfil} change={changePerfil.bind(this)} action={changePage.bind(this)} lista={allergy}/>,
        <RegistroAlergiaConf perfil={perfil} foto={foto} change={changePerfil.bind(this)} registrar={registrarUsuario.bind(this)} action={changePage.bind(this)}/>,
        <RegistroFin email={perfil.email} password={perfil.password} setToken={props.setToken} action={changePage.bind(this)}/>]
        
    return(
        <div className="block">
            <div className="stepHeader">
                <table>
                    <tbody>
                        <tr>
                            <td className="backLink">{leftIcon[phase]}</td>
                            <td className="stepReg"><span className="Paso">{paso[phase]} de 4</span></td>
                            <td className="rightIcon">{rightIcon[phase]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {show[phase]}
        </div>
    )
}