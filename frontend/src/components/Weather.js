import React from 'react';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../features/auth/authSlice";
import {getWeather} from "../features/weather/weatherSlice";


function Weather() {
    const {location} = useSelector((state) => state.current)

    const [weather, setWeather] = useState({
        temp: '',
        condition: '',
        visibility: '',
        icon: '',
    })

    // const {temp, condition, visibility, icon} = weather

    const lat = location.lat
    const lon = location.lon
    console.log("Weather coords",lat,lon)



    const dispatch = useDispatch();






        return (
            <>
                <p>Temp: {location.temp}ºF</p>
                <p className='condition'>Condition: {location.condition}</p>
                <p>Icon: {location.icon}</p>
                <p>Visibility: {location.visibility}</p>
            </>
        )
    }

export default Weather;