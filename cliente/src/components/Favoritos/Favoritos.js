import React from 'react';
import './Favoritos.scss';
import axios from 'axios';
import history from '../History/History'

class Favoritos extends React.Component{
    constructor(){
        super()
        this.state = {lista:[],listaProducto:[],listaComercio:[],listaRestaurante:[]}
        this.url = "http://localhost:9000/"
        this.weekdays = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    }
    componentDidMount(){
        if(localStorage.favoritos === null){
            let list = 
            <div id="Favoritos">
                <div className="stepHeader">
                    <table>
                        <tbody>
                            <tr>
                                <td className="backLink"><span className="smallLink" onClick={()=>{sessionStorage.clear();history.push("/homepage")}}>&lt; Volver</span></td>
                                <td className="stepReg"><span className="Paso">Favoritos</span></td>
                                <td className="rightIcon"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h2>No ha añadido favoritos a la lista</h2>
            </div>
            this.setState({lista:list})
        }
        else{
            let favoritos = JSON.parse(localStorage.favoritos)
            let productos = favoritos["Producto"]
            let comercios = favoritos["Comercio"]
            let restaurantes = favoritos["Restaurante"]
            let idProds = Object.keys(productos)
            let idComer = Object.keys(comercios)
            let idResta = Object.keys(restaurantes)
            let outputProd = [], outputRest = [], outputCome = [];
            axios.post(this.url+"producto/buscar",idProds,{headers:{'Authorization':`Bearer ${localStorage.token}`}})
                .then(async (res)=>{
                    let clSimbolo,clIcono,clMarco;
                    let data = res.data
                    let l = data.length
                    for(let i = 0; i < l; i++){
                        let id = data[i]["id"]
                        let nombre = data[i]["nombre"]
                        let compania = data[i]["compania"]
                        let foto = this.url+data[i]["foto"]
                        let datos = productos[id]
                        let date = Date(datos.fecha)
                        let fecha = `${this.weekdays[date.getDay()]}, ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
                        let ok = datos.ok
                        if(ok===null){
                            clSimbolo = 'noInfo simbolo';
                            clIcono = 'icon-question'
                            clMarco = 'frameNoInfo allMarcos'
                        }
                        else if(ok){
                            clSimbolo = 'okay simbolo';
                            clIcono = 'icon-checkmark'
                            clMarco = 'frameOk allMarcos'
                        }
                        else{
                            clSimbolo = "wrong simbolo"
                            clIcono = 'icon-cross'
                            clMarco = 'frameWrong allMarcos'
                        }
                        var prodObjeto = <tr key={id}>
                            <td className="imageProducto">
                                <span className={clSimbolo}><span className={clIcono}></span></span>
                                <figure className={clMarco}><img src={foto} alt='imagen'/></figure>
                            </td>
                            <td className="informacion">
                                <p className="fecha">{fecha}</p>
                                <p className="nombre">{nombre}</p><p className="compania">{compania}</p>
                            </td>
                        </tr>                        
                        outputProd.push(prodObjeto)
                    }
                    let list = <table id="lista">
                            <tbody>
                                {outputProd}
                            </tbody>
                        </table>
                    this.setState({listaProducto:list})
                })
            axios.post(this.url+"comercio/buscar",idComer,{headers:{'Authorization':`Bearer ${localStorage.token}`}})
                .then(async (res)=>{
                    let data = res.data
                    let l = data.length
                    for(let i = 0; i < l; i++){
                        let id = data[i]["id"]
                        let nombre = data[i]["nombre"]
                        let tipo = data[i]["tipo"]
                        let datos = comercios[id]
                        let fecha = datos.fecha
                        var comerObjeto = <tr key={id}>
                            <td className="informacion">
                                <p className="fecha">{fecha}</p>
                                <p className="nombre">{nombre}</p><p className="compania">{tipo}</p>
                            </td>
                        </tr>                        
                        outputCome.push(comerObjeto)
                    }
                    let list = <table id="lista">
                            <tbody>
                                {outputCome}
                            </tbody>
                        </table>
                    this.setState({listaComercio:list})
                })
            axios.post(this.url+"restauracion/buscar",idResta,{headers:{'Authorization':`Bearer ${localStorage.token}`}})
                .then(async (res)=>{
                    let data = res.data
                    let l = data.length
                    for(let i = 0; i < l; i++){
                        let id = data[i]["id"]
                        let nombre = data[i]["nombre"]
                        let tipo = data[i]["tipo"]
                        let datos = comercios[id]
                        let fecha = datos.fecha
                        var restaObjeto = <tr key={id}>
                            <td className="informacion">
                                <p className="fecha">{fecha}</p>
                                <p className="nombre">{nombre}</p><p className="compania">{tipo}</p>
                            </td>
                        </tr>                        
                        outputRest.push(restaObjeto)
                    }
                    let list = <table id="lista">
                            <tbody>
                                {outputRest}
                            </tbody>
                        </table>
                    this.setState({listaRestaurante:list})
                })
            
        }
    }
    render(){
        return(
            <div id="Favoritos">
                <div className="stepHeader">
                    <table>
                        <tbody>
                            <tr>
                                <td className="backLink"><span className="smallLink" onClick={()=>{sessionStorage.clear();history.push("/homepage")}}>&lt; Volver</span></td>
                                <td className="stepReg"><span className="Paso">Favoritos</span></td>
                                <td className="rightIcon"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h2>Productos favoritos</h2>
                {this.state.listaProducto}
                <h2>Comercios favoritos</h2>
                {this.state.listaComercio}
                <h2>Restaurantes favoritos</h2>
                {this.state.listaRestaurante}
            </div>)
    }
    
}
export default Favoritos


/*export const Favoritos = function(props){
    let url = "http://localhost:9000/"
    const [lista,setLista] = useState([])
    
    if(localStorage.favoritos === null)
    {
        return(
            <div id="Favoritos">
                <div className="stepHeader">
                    <table>
                        <tbody>
                            <tr>
                                <td className="backLink"><span className="smallLink" onClick={()=>{sessionStorage.clear();history.push("/homepage")}}>&lt; Volver</span></td>
                                <td className="stepReg"><span className="Paso">Favoritos</span></td>
                                <td className="rightIcon"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h2>No ha añadido favoritos a la lista</h2>
            </div>
        )
    }
    else{
        let favoritos = JSON.parse(localStorage.favoritos)
        let productos = favoritos["Producto"]
        //let comercios = favoritos["Comercio"]
        //let restaurantes = favoritos["Restaurante"]
        let idProds = Object.keys(productos)
        
        axios.post("http://localhost:9000/producto/buscar",idProds,{headers:{'Authorization':`Bearer ${localStorage.token}`}})
            .then(async (res)=>{
                let clSimbolo,clIcono,clMarco;
                let data = res.data
                let l = data.length
                for(let i = 0; i < l; i++){
                    let id = data[i]["id"]
                    let nombre = data[i]["nombre"]
                    let compania = data[i]["compania"]
                    let foto = url+data[i]["foto"]
                    let datos = productos[id]
                    let fecha = datos.fecha
                    let ok = datos.ok
                    if(ok===null){
                        clSimbolo = 'noInfo simbolo';
                        clIcono = 'icon-question'
                        clMarco = 'frameNoInfo allMarcos'
                    }
                    else if(ok){
                        clSimbolo = 'okay simbolo';
                        clIcono = 'icon-checkmark'
                        clMarco = 'frameOk allMarcos'
                    }
                    else{
                        clSimbolo = "wrong simbolo"
                        clIcono = 'icon-cross'
                        clMarco = 'frameWrong allMarcos'
                    }
                    var prodObjeto = <div id={id} key={id} className="objeto">
                        <div className="imageProducto">
                            <span className={clSimbolo}><span className={clIcono}></span></span>
                            <figure className={clMarco}><img src={foto} alt='imagen'/></figure>
                        </div>
                        <div className="informacion">
                            <p>{fecha} | {nombre} | {compania}</p>
                        </div>
                    </div>
                    let list = lista
                    list.push(prodObjeto)
                    setLista(list)
                    console.log(lista)
                }
                console.log(lista)
            })
            console.log(lista)
            return(
                <div id="Favoritos">
                    <div className="stepHeader">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="backLink"><span className="smallLink" onClick={()=>{sessionStorage.clear();history.push("/homepage")}}>&lt; Volver</span></td>
                                    <td className="stepReg"><span className="Paso">Favoritos</span></td>
                                    <td className="rightIcon"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {lista}
                </div>
            )
            
        
        let comercios = favoritos["Comercio"]
        let listaComr = [<h2 key="titleComr">Comercios favoritos</h2>,<p key="NoComr">No hay comercios favoritos</p>]
        let restaurantes = favoritos["Restaurantes"]
        let listaRest = [<h2 key="titleRest">Restaurantes favoritos</h2>,<p key="NoRest">No hay restaurantes favoritos</p>]

        
    }    
    
}*/