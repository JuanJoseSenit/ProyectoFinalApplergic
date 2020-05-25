import React, { Component } from "react";
import "./GoogleMaps.scss";
import axios from "axios";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";
import { Cabecera } from "./Cabecera";

export class MapContainerRest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: "", //Shows the infoWindow to the selected place upon a marker
      restaurante: [],
      centroMapa: {},
      marcadores: [],
      numeroRestaurantes: Number,
      coordenadasLocalizacionInicial: {},
      contadorRestaurantes: Number,
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
      dDist = <p>Distancia a este restaurante: {props.distancia} km</p>;

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
    //console.log("distancia seleccionada :", distanciaSeleccionada, typeof(distanciaSeleccionada));
    let tipoComida = document.getElementById("tipoRestaurante").value;
    let restauracion = { tipo: tipoComida };
    await axios
      .post("http://localhost:9000/restauracion/filtrar", restauracion)
      .then((res) => {
        //console.log(res.data);
        //console.log("distancia seleccionada dentro de axios",distanciaSeleccionada)
        let result = res.data;
        let numeroRestaurantes = result.length;

        //console.log("El numero de restaurantes es de " + numeroRestaurantes)
        this.setState({ restaurante: result });
        let marcadores = [];
        let latitud = 0;
        let longitud = 0;
        let distancia = 0;
        let contadorRestaurantes = 0;

        //FOR PARA CENTRAR EL MAPA SI EL FUCK..... MARKER DE LA UBICACIÓN CAMBIASE
        for (let i = 0; i < numeroRestaurantes; i++) {
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
            //console.log("media de las latitudes de los restaurantes", latitud);
            longitud = longitud + rest.localizacion.lng;
            contadorRestaurantes = contadorRestaurantes + 1;
          }
        }
        let latitudPuntoInicial = this.state.coordenadasLocalizacionInicial.lat;
        //console.log("Latitud del punto inicial:", latitudPuntoInicial);
        //console.log("numero restaurantes", numeroRestaurantes);
        let longitudPuntoInicial = this.state.coordenadasLocalizacionInicial
          .lng;
        //console.log("Longitud del punto inicial:", longitudPuntoInicial);

        latitud = (latitud + latitudPuntoInicial) / (contadorRestaurantes + 1);
        //console.log("Media de las latitudes", latitud, "numero de restaurantes encontrados",);
        longitud =
          (longitud + longitudPuntoInicial) / (contadorRestaurantes + 1);

        let centroMapa = { lat: latitud, lng: longitud };
        this.setState({ marcadores });
        this.setState({ centroMapa });
        this.setState({ numeroRestaurantes });
        //console.log( numeroRestaurantes )
        this.setState({ contadorRestaurantes });
        //console.log("El centro del mapa es", this.state.centroMapa);
      });
  }

  render() {
    return (
      <div id="Mapa">
        <Cabecera colorRest={"colorRestaurante"}></Cabecera>
        <div className="opciones">
          <div className="div_select_boton">
            <span className="span">Tipo de comida: </span>

            <select
              name="tipoRestaurante"
              id="tipoRestaurante"
              className="tipo"
            >
              <option value="Americana">Americana</option>
              <option value="China">China</option>
              <option value="Española">Española</option>
              <option value="Pizzeria">Italiana</option>
              <option value="Japonesa">Japonesa</option>
              <option value="Mexicana">Mexicana</option>
              <option value="Tapas">Tapas</option>
              <option value="Vegetariana">Vegetariana</option>
            </select>
            <span className="span">Distancia: </span>
            <select name="distancia" id="distancia" className="tipo_distancia">
              <option value="1">1 km</option>
              <option value="2">2 km</option>
              <option value="3">3 km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="99999999">Todos</option>
            </select>
          </div>

          <button className="boton" onClick={this.seleccionar.bind(this)}>
            Buscar
          </button>
        </div>
        <div>
          Número de restaurantes encontrados:{" "}
          <b>
            {this.state.contadorRestaurantes} de {this.state.numeroRestaurantes}{" "}
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
})(MapContainerRest);
