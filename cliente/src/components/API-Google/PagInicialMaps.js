import React, { useState } from 'react';
import { Cabecera } from './Cabecera';
import logogooglemaps from '../../assets/img/googlemaps/googlemaps.png'

export const PagInicialMaps = function (props) {
  
    return (
        <div className="pagina_inicial">
            <Cabecera></Cabecera>
            <div className="texto_pag_inicial"><p >Encuentra los restaurantes y comercios que más le interese según sus necesidades</p></div>
            <img width="375px" className="img_responsive" src={logogooglemaps}/>
        </div>
    );
}
