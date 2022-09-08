import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {StartWatch} from "../features/session/sessionSlice";
import dayjs from 'dayjs';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";


function NewBird() {
    const {user} = useSelector((state) => state.auth)
    const {session} = useSelector((state) => state.session)
    const {location} = useSelector((state) => state.current)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let userID = user._id

    const getData = (e) => {
        let city = location.city;
        let lat = location.lat;
        let lon = location.lon;
        // let temperature = document.getElementById('add_temp').innerText;
        // let visibility = document.getElementById('add_vis').innerText;
        // let condition = document.getElementById('add_cond').innerText;
        // let icon = document.getElementById('add_icon').innerText;


        let sessData = {
            city,
            lat,
            lon,
            user: user._id,
            // icon,
            // temperature,
            // visibility,
            // condition
        }

        console.log(sessData)
        dispatch(StartWatch(sessData))
        navigate('/watch')

    }

    const position = [location.lat, location.lon]
    const date = dayjs().format('dddd, MMMM D, YYYY')

    return (

        <>
            <div className="main-add">
                <section className="content">

                    <article className='seen_group'>
                        <div className='seen_title'>Start Bird watching</div>


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
                        </div>
                        <button onClick={getData} className="add_session_btn">CONFIRM LOCATION</button>


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