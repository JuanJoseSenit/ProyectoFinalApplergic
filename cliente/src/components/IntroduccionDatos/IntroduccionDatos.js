import React, { useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const IntroduccionDatos = function(){
    const [foto,setFoto] = useState(null)
    function envioDatos(val){
        let token = localStorage.token
        let url = "http://localhost:9000/"+val+"/crud/";
        let values = document.getElementById("valores").value
        let array = JSON.parse(values)
        if(array.length === 1){
            array = array[0]
            array.id = uuidv4();
        }
        else{
            for(let i=0;i<array.length;i++){
                array[i].id = uuidv4();
            }
        }
        if(val !== "producto"){
            axios.post(url,array,{headers:{"Authorization": `Bearer ${token}`}})
                .then((res)=>console.log("Elemento ",val,": ",res),(err)=>{console.log("Error: ",err)})
        }
        else{
            let fd = new FormData()
            for(let [key,value] of Object.entries(array)){
                fd.append(key,value)
            }
            fd.append("foto",foto)
            
            axios.post(url,fd,{headers:{"Authorization": `Bearer ${token}`}})
            .then((res)=>console.log("Elemento ",val,": ",res),(err)=>{console.log("Error: ",err)})
        }
    }
    return(
        <div>
        <p><select id="Opcion" name="Opciones">
            <option value="comercio">Comercio</option>
            <option value="producto">Producto</option>
            <option value="restauracion">Restaurante</option>
        </select>
        </p>
        <p><input type="textarea" id="valores"/></p>
        <p><input type="file" id="imagen" onChange={($event)=>{console.log($event.target.files[0]);setFoto($event.target.files[0])}}/></p>
        <button onClick={()=>{let v = document.getElementById("Opcion").value;envioDatos(v)}}>Enviar</button>
        </div>
    )
}