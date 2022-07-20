import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getLast, reset} from "../features/bird/birdSlice";
import dayjs from 'dayjs';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import Spinner from "../components/Spinner";

// import Spinner from "../components/Spinner";



function NewBird() {
    const {user} = useSelector((state) => state.auth)
    const {last, isLoading, isSuccess} = useSelector((state) => state.bird)
    const {location} = useSelector((state) => state.current)

    const [count, setCount] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getLast())
    }, [dispatch])

    if (isLoading) {
        return <Spinner/>
    }

    // Function is called everytime increment button is clicked
    const addOne = () => {
        // Counter state is incremented
        setCount(count + 1);

    }

    // Function is called everytime increment button is clicked
    const minusOne = () => {
        // Counter state is incremented
        setCount(c => Math.max(c - 1, 0));
    }

    const add_session = () => {
        let comName, city, user, code, bird, lat, lon, count

        comName = document.getElementById('add_comName').innerText;
        city = document.getElementById('add_city').innerText;
        user = document.getElementById('add_user').innerText;
        code = document.getElementById('add_speciesCode').innerText;
        lat = document.getElementById('add_lat').innerText;
        lon = document.getElementById('add_lon').innerText;
        bird = document.getElementById('add_bird_id').innerText;
        // let temp = document.getElementById('add_temp').innerText
        // let cond = document.getElementById('add_cond').innerText
        // let visibility = document.getElementById('add_vis').innerText
        // let icon = document.getElementById('add_icon').innerText
        count = document.getElementById('add_count').innerText;
        console.log('Add Session')

        console.log("sess: ", comName, city, user, code, bird, lat, lon, count)


    }


    const position = [location.lat, location.lon]
    const date = dayjs(last.createdAt).format('dddd, MMMM D, YYYY')


    return (

        <>
            <div className="main-add">
                <section className="content">

                    <div>
                        <h1 className='seen_title'>Add </h1>
                        <p id='add_comName' className='seen_bird'>{last.comName}</p>
                        <p className='add-text'>to birds you have seen before.</p>


                        <div className="leafletContainer">
                            <MapContainer className='map_container' center={position} zoom={13} scrollWheelZoom={false}
                                          attributionControl={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        A pretty CSS3 popup. <br/> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>

                        <p id='add_city' className='seen_city'> {location.city}</p>
                        <p className='seen_name'>{user.firstname} {user.lastname}</p>
                        <p className='seen_time'>{date}</p>

                        <button onClick={minusOne} className='minus_button'>-</button>
                        <div id='add_count'>{count} </div>
                        <button className='add_button' onClick={addOne}>+</button>

                        <p id='add_user'>User: {last.user}</p>

                        <p id='add_speciesCode'>Species code:{last.speciesCode}</p>
                        <p id='add_bird_id'>BIRD ID: {last._id}</p>

                        <p id='add_lat'>Lat: {location.lat}</p>
                        <p id='add_lon'>Lon: {location.lon}</p>

                        <button id='add_session_btn' onClick={add_session} className="add_session_btn">Accept</button>

                    </div>
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