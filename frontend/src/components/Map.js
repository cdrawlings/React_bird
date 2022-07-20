import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useSelector} from "react-redux";

function Map() {
    const {location} = useSelector((state) => state.current)
console.log("Map", location.lat, location.lon)
    return (
        <div>






        </div>
    );
}



export default Map;