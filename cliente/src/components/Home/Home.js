import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

export const Home = function(props){
    return(
        <div className="divHome">
            <p>Loguéate <Link className="link" to="/login">AQUÍ</Link></p>
            <p>Regístrate <Link className="link" to="/registro">AQUÍ</Link></p>
            <p>Cambia tu perfil <Link className="link" to="/perfil">AQUÍ</Link></p>
            <p>Accede a los términos <Link className="link" to="/terminos">AQUÍ</Link></p>
            <p>Evalua la aplicación <Link className="link" to="/evaluacion">AQUÍ</Link></p>
        </div>
    )
}