import React from 'react';
import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {getLast, reset} from "../features/bird/birdSlice";
import {addLocation} from "../features/current/currentSlice";

import {toast} from "react-toastify";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import Spinner from "../components/Spinner";

// import Spinner from "../components/Spinner";



function NewBird() {
    const {user} = useSelector((state) => state.auth)
    const {last, isLoading, isSuccess} = useSelector((state) => state.bird )
    const {location} = useSelector((state) => state.current)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(reset())
            }
        }



    }, [dispatch,isSuccess])

    useEffect(() => {
        dispatch(getLast())
    }, [dispatch])







    if (isLoading){
        return <Spinner />
    }
    const position = [location.lat, location.lon]


    return (

        <>
            <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

            <div className="main-add">
                    <section className="content">

                        <h1 className='title'>Add this bird</h1>
                        <p className='add-text'>to birds you have seen before.</p>



                    <p>User: {last.user}</p>

                    <p>First: {user.firstname}</p>
                    <p>Last: {user.lastname}</p>

Map:




                        <div className="leafletContainer">
                            <MapContainer style={{ height:'300px' , width:'90%' }} center={position} zoom={13} scrollWheelZoom={false} attributionControl={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>



                    <p>Timestamp: {last.createdAt}</p>
                    <p>Bird Name: {last.comName}</p>
                    <p>Species code:{last.speciesCode}</p>
                    <p>BIRD ID: {last._id}</p>

                    <p>Quantity of bird seen: 0</p>


                    <p>Lat: {location.lat}</p>
                    <p>Lon: {location.lon}</p>
                    <p>City: {location.city}</p>

                </section>
            </div>


            <script
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly"
                defer
            ></script>

        </>
    );
}

/*
<p>Temp: {location.temp}</p>
<p>Cond: {location.condition}</p>
<p>Visibility: {location.visibility}</p>
<p>Icon: {location.icon}</p>
 */

export default NewBird;