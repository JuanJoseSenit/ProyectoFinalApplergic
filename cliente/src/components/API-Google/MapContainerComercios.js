import React, { Component } from "react";
import "./GoogleMaps.scss";
import axios from "axios";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";
import { Cabecera } from "./Cabecera";

const mapStyles = {
  width: "100%",
  height: "80%",
};
export class MapContainerComercios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: "", //Shows the infoWindow to the selected place upon a marker
      comercio: [],
      centroMapa: {},
      marcadores: [],
      numeroComercios: Number,
      coordenadasLocalizacionInicial: {},
      contadorComercios: Number,
    };
  }

  onMarkerClick = (props, marker, e) => {
    let dName = "",
      dAler = "",
      dTipo = "",
      dDist = "";
    if (props.name)
      dName = <h4 className="nombre_restaurante_comercio">{props.name}</h4>;
    //console.log("props", props);
    if (props.alergenos) {
      dAler = <p>Alérgenos: {props.alergenos.join(", ")}</p>;
    }
    if (props.tipo) dTipo = <p>Tipo de comida: {props.tipo}</p>;
    if (props.distancia)
      dDist = <p>Distancia a este comercio: {props.distancia} km</p>;

    let datos = (
      <div>
        {dName}
        {dAler}
        {dTipo}
        {dDist}
      </div>
    );

    this.setState({
      selectedPlace: datos,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  localizacionInicial = (localizacion) => {
    let localizacionActual = localizacion;
    //console.log(localizacionActual);
    this.setState({ coordenadasLocalizacionInicial: localizacionActual });
  };

  async seleccionar() {
    let distanciaSeleccionada = document.getElementById("distancia").value;
    distanciaSeleccionada = parseFloat(distanciaSeleccionada);
    /* console.log(
      "distancia seleccionada :",
      distanciaSeleccionada,
      typeof distanciaSeleccionada
    ); */
    let tipoComercio = document.getElementById("tipoComercio").value;
    let comercio = { tipo: tipoComercio };
    await axios
      .post("http://localhost:9000/comercio/filtrar", comercio)
      .then((res) => {
        //console.log(res.data);
        let result = res.data;
        let numeroComercios = result.length;
        //console.log("El numero de comercios es de " + numeroRestaurantes)
        this.setState({ comercio: result });
        let marcadores = [];
        let latitud = 0;
        let longitud = 0;
        let distancia = 0;
        let contadorComercios = 0;
        //FOR PARA CENTRAR EL MAPA SI EL FUCK..... MARKER DE LA UBICACIÓN CAMBIASE
        for (let i = 0; i < numeroComercios; i++) {
          let rest = result[i];
          //console.log("Lo que tiene rest", rest);
          let kye = `marker${i}`;

          /* console.log(
            "Distancia",
            rest.localizacion.lat,
            this.state.coordenadasLocalizacionInicial.lat,
            rest.localizacion.lng,
            this.state.coordenadasLocalizacionInicial.lng
          ); */

          distancia = Math.sqrt(
            ((rest.localizacion.lat -
              this.state.coordenadasLocalizacionInicial.lat) *
              110.57) **
              2 +
              ((rest.localizacion.lng -
                this.state.coordenadasLocalizacionInicial.lng) *
                111.32) **
                2
          );
          distancia = distancia.toFixed(2);
          if (distancia <= distanciaSeleccionada) {
            //console.log(distancia);
            let mark = (
              <Marker
                icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                key={kye}
                onClick={this.onMarkerClick}
                position={rest.localizacion}
                name={rest.nombre}
                alergenos={rest.alergenos}
                tipo={rest.tipo}
                distancia={distancia}
              />
            );
            marcadores.push(mark);
            latitud = latitud + rest.localizacion.lat;
            //console.log("media de las latitudes de los comercios", latitud);
            longitud = longitud + rest.localizacion.lng;
            contadorComercios = contadorComercios + 1;
          }
        }
        let latitudPuntoInicial = this.state.coordenadasLocalizacionInicial.lat;
        //console.log("Latitud del punto inicial:", latitudPuntoInicial);
        //console.log("numero comercios", numeroComercios);
        let longitudPuntoInicial = this.state.coordenadasLocalizacionInicial
          .lng;
        //console.log("Longitud del punto inicial:", longitudPuntoInicial);

        latitud = (latitud + latitudPuntoInicial) / (contadorComercios + 1);
        //console.log("Media de las latitudes", latitud);
        longitud = (longitud + longitudPuntoInicial) / (contadorComercios + 1);

        let centroMapa = { lat: latitud, lng: longitud };
        this.setState({ marcadores });
        this.setState({ centroMapa });
        this.setState({ numeroComercios });
        this.setState({ contadorComercios });
        //console.log("El centro del mapa es", this.state.centroMapa);
      });
  }

  render() {
    return (
      <div id="Mapa">
        <Cabecera color={"colorComercio"}></Cabecera>
        <div className="opciones">
          <div className="div_select_boton">
            <span className="span">Tipo de comercio: </span>
            <select name="tipoComercio" id="tipoComercio" className="tipo">
              <option value="Mercado">Mercado</option>
              <option value="Supermercado">Supermercado</option>
            </select>
            <span className="span">Distancia: </span>
            <select name="distancia" id="distancia" className="tipo_distancia">
              <option value="1">1km</option>
              <option value="2">2km</option>
              <option value="3">3km</option>
              <option value="5">5km</option>
              <option value="10">10km</option>
              <option value="99999999">Todos</option>
            </select>
          </div>

          <button className="boton" onClick={this.seleccionar.bind(this)}>
            Buscar
          </button>
        </div>
        <div>
          Número de comercios encontrados:{" "}
          <b>
            {this.state.contadorComercios} de {this.state.numeroComercios}{" "}
            totales
          </b>
        </div>
        <CurrentLocation
          centerAroundCurrentLocation
          //centroMapa={this.state.centroMapa}
          values={this.state.coordenadas}
          google={this.props.google}
          localizacionInicial={this.localizacionInicial.bind(this)}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={"Usted está aquí"}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
          {this.state.marcadores}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            {this.state.selectedPlace}
          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDZD71P8o7Jppkz5IQLhzxtROFJeCi_HD4",
})(MapContainerComercios);
