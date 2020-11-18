import React from "react";
import {
  Map,
  TileLayer,
  WMSTileLayer,
  LayerGroup,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PolygonLayer from "../components/PolygonLayer";
import PozwoleniaLayer from "../components/PozwoleniaLayer";
import WnioskiLayer from "../components/WnioskiLayer";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Legend from "../components/Legend";

const DEFAULT_VIEWPORT = {
  center: [49.55813806107707, 20.633729696273807],
  zoom: 12,
};

//Axios cancel token
const source = axios.CancelToken.source();

class MapClass extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      dane: "",
      pozwolenia: "",
      //enabledPozwolenia:this.enabledPozwolenia,
      wnioski: "",
      viewport: DEFAULT_VIEWPORT,
      bbox: "",
      getPozwolenia: "false",
      feat: "",
      circlePozwolenia: false,
      circleWnioski: false,
    };
  }

  fetchData = async () => {
    const map = this.mapRef.current;
    const result = await axios(
      process.env.REACT_APP_API_URL +
        "api/dzialki/?bbox=" +
        this.getBoundaries(map)._southWest.lat +
        "," +
        this.getBoundaries(map)._southWest.lng +
        "," +
        this.getBoundaries(map)._northEast.lat +
        "," +
        this.getBoundaries(map)._northEast.lng,
      { CancelToken: source.token }
    );
    this.setState({
      dane: result.data,
      //viewport: DEFAULT_VIEWPORT,
    });
  };

  fetchPozwolenia = async () => {
    const map = this.mapRef.current;
    this.setState({
      circlePozwolenia: true,
    });
    const result = await axios(
      process.env.REACT_APP_API_URL +
        "api/pozwolenia_geom/?bbox=" +
        this.getBoundaries(map)._southWest.lat +
        "," +
        this.getBoundaries(map)._southWest.lng +
        "," +
        this.getBoundaries(map)._northEast.lat +
        "," +
        this.getBoundaries(map)._northEast.lng +
        "&start_date=" +
        this.props.filtry.from +
        "&end_date=" +
        this.props.filtry.to +
        "&category=" +
        this.props.filtry.category +
        "&investor=" +
        this.props.filtry.investor,
      { CancelToken: source.token }
    );
    this.setState({
      pozwolenia: result.data,
    });
    this.setState({
      circlePozwolenia: false,
    });
  };

  fetchWnioski = async () => {
    const map = this.mapRef.current;
    this.setState({
      circleWnioski: true,
    });
    const result = await axios(
      process.env.REACT_APP_API_URL +
        "api/wnioski_geom/?bbox=" +
        this.getBoundaries(map)._southWest.lat +
        "," +
        this.getBoundaries(map)._southWest.lng +
        "," +
        this.getBoundaries(map)._northEast.lat +
        "," +
        this.getBoundaries(map)._northEast.lng +
        "&start_date=" +
        this.props.filtryWnioski.from +
        "&end_date=" +
        this.props.filtryWnioski.to +
        "&category=" +
        this.props.filtryWnioski.category
    );
    this.setState({
      wnioski: result.data,
    });
    this.setState({
      circleWnioski: false,
    });
  };

  componentDidMount() {
    const map = this.mapRef.current;
    this.setState({ bbox: this.getBoundaries(map) });
    this.fetchPozwolenia();
    this.fetchWnioski();
  }

  componentDidUpdate(prevProps) {
    const map = this.mapRef.current;

    if (
      prevProps.enabledPozwolenia !== this.props.enabledPozwolenia ||
      prevProps.filtry !== this.props.filtry
    ) {
      if (
        (map.viewport.zoom > 11 && this.props.enabledPozwolenia) ||
        (map.viewport.zoom === undefined && this.props.enabledPozwolenia)
      ) {
        this.setState({ pozwolenia: null });
        this.fetchPozwolenia();
      }

      if (!this.props.enabledPozwolenia) this.setState({ pozwolenia: null });
    }
    if (
      prevProps.enabledWnioski !== this.props.enabledWnioski ||
      prevProps.filtryWnioski !== this.props.filtryWnioski
    ) {
      if (
        (map.viewport.zoom > 11 && this.props.enabledWnioski) ||
        (map.viewport.zoom === undefined && this.props.enabledWnioski)
      )
        this.fetchWnioski();
      if (!this.props.enabledWnioski) this.setState({ wnioski: null });
    }
  }

  handleClick = (viewport) => {
    this.setState({ dane: null });
    this.setState({ pozwolenia: null });
    this.setState({ wnioski: null });
    this.setState({ viewport: viewport });

    viewport.zoom > 17 ? this.fetchData() : this.setState({ dane: null });

    {
      viewport.zoom > 11 && this.props.enabledPozwolenia
        ? this.fetchPozwolenia()
        : this.setState({ pozwolenia: null });
    }
    {
      viewport.zoom > 11 && this.props.enabledWnioski
        ? this.fetchWnioski()
        : this.setState({ wnioski: null });
    }
  };

  getBoundaries = (map) => {
    return map.leafletElement.getBounds();
  };

  getBbox = (bbox) => {
    console.log(bbox);
    console.log("parcel");
    const map = this.mapRef.current;
    map.leafletElement.fitBounds(bbox);
  };

  callBackFeat = (dataFromChild) => {
    this.setState({ feat: dataFromChild });
  };
  getBounds;

  render() {
    return (
      <React.Fragment>
        <Map
          id="map"
          viewport={this.state.viewport}
          style={{
            height: this.props.height,
            width: this.props.width,
            position: "absolute",
            right: "0px",
          }}
          maxZoom={19}
          bounds={this.bbox}
          animate="true"
          onViewportChanged={this.handleClick}
          ref={this.mapRef}
          zoomControl={false}
          //onclick={this.handleClick}
        >
          <LayerGroup>
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="osm" checked={true}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  //url="http://globalheat.strava.com/tiles/cycling/color7/color7/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="esri">
                <TileLayer
                  attribution='Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>

              <LayersControl.Overlay name="ortofotomapa">
                <WMSTileLayer
                  url="http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer?"
                  layers="Raster"
                  transparent={true}
                  format="image/png"
                  opacity={0.8}
                />
              </LayersControl.Overlay>
              {!!this.state.pozwolenia ? (
                <PozwoleniaLayer
                  dane={this.state.pozwolenia}
                  bbox={this.bbox}
                />
              ) : this.state.circlePozwolenia ? (
                <CircularProgress
                  style={{
                    zIndex: 999,
                    position: "absolute",
                    top: 500,
                  }}
                />
              ) : (
                <div></div>
              )}
              {!!this.state.wnioski ? (
                <WnioskiLayer dane={this.state.wnioski} />
              ) : this.state.circleWnioski ? (
                <CircularProgress
                  style={{
                    color: "red",
                    zIndex: 999,
                    position: "absolute",
                    top: 400,
                  }}
                />
              ) : (
                <div></div>
              )}
              {!!this.state.dane ? (
                <PolygonLayer
                  bbox={this.getBbox}
                  dane={this.state.dane}
                  callBackFeat={this.callBackFeat}
                />
              ) : (
                <p></p>
              )}
            </LayersControl>
          </LayerGroup>
          <ZoomControl position="bottomright" />
        </Map>
        <Legend zoom={this.state.viewport.zoom} />
      </React.Fragment>
    );
  }
}

export default MapClass;
