import React from "react";
import ReactDOM from "react-dom";

const mapStyles = {
  map: {
    position: "absolute",
    width: "86.6667%",
    height: "80%",
    top: "18%",
    left: "6.6667%",
  },
};

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;

    this.state = {
      currentLocation: { lat, lng },
      values: this.props.values,
    };
    //console.log("Centro del punto inicial",this.state.currentLocation);
  }
  newLocation(lat, lng) {
    this.setState({ currentLocation: { lat, lng } });
    //console.log("Centro del punto inicial",this.state.currentLocation);
    this.props.localizacionInicial(this.state.currentLocation); //<-----llamada a la función que está en el padre y que envía las coordenadas de la ubicación actual al padre
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
    if (prevState.values !== this.state.values) {
      console.log(this.state.values);
      let values = this.state.values;
      let { latitude, longitude } = this.props.initialCenter;
      for (let coord of values) {
        latitude += coord.lat;
        longitude += coord.lng;
      }
      latitude = latitude / (1 + values.length);
      longitude = longitude / (1 + values.length);
      this.newLocation(latitude, longitude);
    }
  }
  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.newLocation(coords.latitude, coords.longitude);
        });
      }
    }

    /*if(this.props.values && this.props.values[0]){
          let latitude = 0;
          let longitude = 0;
          for(let coord of this.props.values){
            latitude += coord.lat
            longitude += coord.lng
          }
          latitude = latitude/this.props.values.length
          longitude = longitude/this.props.values.length
          console.log(latitude,longitude)
          this.setState({
            currentLocation:{
              lat: latitude,
              lng: longitude
            }
          })
        }*/
    this.loadMap();
  }
  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }
  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, (c) => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }
  render() {
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 36.8233,
    lng: -1.2884,
  },
  centerAroundCurrentLocation: false,
  visible: true,
};
