import React from 'react';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

function Current() {
let icon

    const [weather, setWeather] = useState([])
    const [location, setLocation] = useState([])
    const [coords, setCoords] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchLocation()
        fetchWeather()
        getCoords()
    }, [])

    const fetchWeather = async () => {
        const apiKey = 'c2badbed053fc07c15b017c4906fade6';

        let lat = coords.lat
        let lon = coords.lon

        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely,alerts&appid=${apiKey}&units=imperial`
        )

        let data = await response.json()

        setWeather(data)

        setLoading(false)

    }

    const getCoords = async () => {
    navigator.geolocation.getCurrentPosition(async position => {
            setCoords({
                lat:position.coords.latitude,
                lon:position.coords.longitude
            })
        })
    }

    const fetchLocation = async () => {
        const locApi = "AIzaSyAF2o2lBWk9H8JQhpwvI_U9e5rFZUikQY4";

        let lat = coords.lat
        let lon = coords.lon

        console.log("LAT: ", lat, lon);

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${locApi}`
        )

        let data = await response.json()

        setLocation(data)

        console.log( data);

        setLoading(false)

    }



    if (!loading) {
        return (
            <>
                <p>City:{location.results[0].address_components[3].long_name}</p>
                <p>Lat: {coords.lat}</p>
                <p> Lon: {coords.lon}</p>

                Weather< br />
                <div className="temp">Temp: {weather.current.temp}</div>
                <div className="condition">Condition:  {weather.current.weather[0].description}</div>

                <img
                    src={`http://openweathermap.org/img/w/${weather.current.weather[0].icon}.png`}
                    alt="weather status icon"
                    className="weather-icon"
                />
            </>
        )
    } else {
        return <h3>Loading...</h3>
    }

}

export default Current;

