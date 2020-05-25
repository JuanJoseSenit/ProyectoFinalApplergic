import React from 'react';
import { Privado } from '../Privado/Privado';
import { Publico } from '../Publico/Publico';

class Base extends React.Component{
    constructor(props){
        super(props);
        this.state = { token: '' };
        this.cargarToken = this.cargarToken.bind(this)
        this.guardarToken = this.guardarToken.bind(this)
        this.borrarToken = this.borrarToken.bind(this)
        this.gestionToken = this.gestionToken.bind(this)
        this.listAlergias = {"A":["Ácido benzoico", "Almendra", "Altramuz", "Anacardo", "Apio", "Arroz","Avellana"],
                   "C":["Cacahuete", "Cacao", "Castaña", "Cereza", "Coco", "Crustáceo"],
                   "F":["Fenilalanina","Fibras","Fresa","Fructosa","Frutos con cáscara","Frutos rojos"],
                   "G":["Gelatina","Glucosa","Gluten","Guisante"],
                   "H":["Huevo"],
                   "K":["Kiwi"],
                   "L":["Lactosa","Leche","Legumbres","Lenteja","Lino","LTP"],
                   "M":["Maíz","Marisco","Melocotón","Moluscos","Mostaza"],
                   "N":["Nuez"],
                   "P":["Pescado","Piñones","Pistacho","Plátano"],
                   "R":["Rosáceas"],
                   "S":["Sésamo","Soja","Sulfitos"],
                   "T":["Tomate","Trazas"],
                   "U":["Uva"],
                   "V":["Vitamina D","Vitamina E"],
                   "Y":["Yuca"]}
    }
    cargarToken(){
        if(localStorage.token){
            this.setState({token:localStorage.token})            
        }
    }
    guardarToken(token){
        localStorage.token = token;
        this.setState({ token: token });
    }
    borrarToken(){
        localStorage.removeItem("token");
        this.setState({ token: '' });
    }
    gestionToken(token){
        if(token){
            this.guardarToken(token)
        }
        else{
            this.borrarToken()
        }
    }

    componentDidMount(){
        this.cargarToken()
    }
    
    render(){
        if(this.state.token){
            return(
                <Privado setToken={this.gestionToken} listAlergias={this.listAlergias}/>
            )
        }
        else{
            return(
                <Publico setToken={this.gestionToken} listAlergias={this.listAlergias}/>
            )
        }
    }
}

export default Base;