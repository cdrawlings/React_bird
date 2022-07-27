import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getLast} from "../features/bird/birdSlice"
import {addSession, reset} from "../features/session/sessionSlice";
import dayjs from 'dayjs';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify";


function NewBird() {
    const {user} = useSelector((state) => state.auth)
    const {last} = useSelector((state) => state.bird)
    const {location} = useSelector((state) => state.current)

    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.session)

    const [count, setCount] = useState(1)
    const [watch, setWatch] = useState({
        city: '',
        lat: '',
        lon: '',
        // icon: '',
        // temperature: '',
        // visibility: '',
        // condition: '',
        count: '',
        comName: '',
        speciesCodev: '',
        birdid: '',
        user: '',
    })


    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getLast())
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset)
            navigate('/')
        }

        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message])

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

    const getData = (e) => {
        console.log("pressed");
        let city = document.getElementById('add_city').innerText;
        let lat = document.getElementById('add_lat').innerText;
        let lon = document.getElementById('add_lon').innerText;
        // let temperature = document.getElementById('add_temp').innerText;
        // let visibility = document.getElementById('add_vis').innerText;
        // let condition = document.getElementById('add_cond').innerText;
        // let icon = document.getElementById('add_icon').innerText;
        let comName = document.getElementById('add_comName').innerText;
        let speciesCode = document.getElementById('add_speciesCode').innerText;
        let birdid = document.getElementById('add_bird_id').innerText;
        let user = document.getElementById('add_user').innerText;


        setWatch((prevState) => ({
            ...prevState,
            city,
            lat,
            lon,
            // icon,
            // temperature,
            // visibility,
            // condition,
            count,
            comName,
            speciesCode,
            birdid,
            user
        }))
        console.log("get data 1", watch)
        dispatch(addSession(watch))

    }
    console.log("get data 2", watch)


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
                        <button id='add_session_btn' onClick={getData} className="add_session_btn">ACCEPT</button>


                    </article>

                </section>
            </div>

        </>
    );
}

/*
<p id='add_temp'>Temp: {location.temp}</p>
<p id='add_cond'>Cond: {location.condition}</p>
<p id='add_visn'>Visibility: {location.visibility}</p>
<p id='add_icon'>Icon: {location.icon}</p>
 */

export default NewBird;