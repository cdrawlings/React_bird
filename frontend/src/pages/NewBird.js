import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addBird, getLast, reset} from "../features/bird/birdSlice";
import dayjs from 'dayjs';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import Spinner from "../components/Spinner";

// import Spinner from "../components/Spinner";



function NewBird() {
    const {user} = useSelector((state) => state.auth)
    const {last, isLoading, isSuccess} = useSelector((state) => state.bird)
    const {location} = useSelector((state) => state.current)

    // States
    const [newbird, setNewBird] = useState({
        comName: '',
        speciesCode: '',
    })

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

    // Add one to count
    const addOne = () => {
        // Counter state is incremented
        setCount(count + 1);

    }

    // Minus one to count
    const minusOne = () => {
        // Counter state is incremented
        setCount(c => Math.max(c - 1, 0));
    }

    // Add new bird and information to database
    const add_session = (e) => {
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

        setNewBird((prevState) => ({
            ...prevState,
            comName: comName,
            speciesCode: code,
            city,
            user,
            birdid: bird,
            lat,
            lon,
            count
        }))

        const spotted = {
            comName,
            speciesCode: code,
            city,
            user,
            birdid: bird,
            lat,
            lon,
            count
        }
        dispatch(addBird(spotted))

    }

    const position = [location.lat, location.lon]
    const date = dayjs(last.createdAt).format('dddd, MMMM D, YYYY')

    return (

        <>
            <div className="main-add">
                <section className="content">

                    <article className='seen_group'>
                        <div className='seen_title'>Add</div>
                        <div id='add_comName' className='seen_bird'>{last.comName}</div>
                        <div className='seen_text'>to birds you have seen before.</div>

                        <div className="counter_block">
                            <div className="counter_text">How many seen:</div>

                            <div className="counter_elements">
                                <button onClick={minusOne} className='minus_button'>-</button>
                                <div id='add_count' className='count_elem'>{count} </div>
                                <button className='add_button' onClick={addOne}>+</button>
                            </div>
                        </div>

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


                            <div className="loc-date">
                                <p id='add_city' className='seen_city'> {location.city}</p>
                                <p className='seen_time'>{date}</p>
                            </div>

                            <div className="hidden">

                                <p id='add_user'>User: {last.user}</p>

                                <p id='add_speciesCode'>Species code:{last.speciesCode}</p>
                                <p id='add_bird_id'>BIRD ID: {last._id}</p>

                                <p id='add_lat'>Lat: {location.lat}</p>
                                <p id='add_lon'>Lon: {location.lon}</p>

                            </div>
                        </div>
                        <button id='add_session_btn' onClick={add_session} className="add_session_btn">ACCEPT</button>


                    </article>

                </section>
            </div>

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