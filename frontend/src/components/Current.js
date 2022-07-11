import React from 'react';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getWeather } from "../features/weather/weatherSlice"

function Current() {
    const {location} = useSelector((state) => state.location)
    const {weather} = useSelector((state) => state.weather)

    const lat = location.lat
    const lon = location.lon
    console.log(lat,lon)

    const apiKey = 'c2badbed053fc07c15b017c4906fade6';

    const dispatch = useDispatch();

    useEffect(() => {
        addWeather();
    }, [])



    // Get Weather information
    const addWeather = async () => {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely,alerts&appid=${apiKey}&units=imperial`)

        const responseData = await weatherResponse.json()

        console.log(responseData);
        const temp = responseData.current.temp;
        const condition = responseData.current.weather[0].description;
        const icon = responseData.current.weather[0].icon;
        const visibility = responseData.current.visibility;

        const weatherData = {
            temp, condition, icon, visibility
        }

        dispatch(getWeather(weatherData))
    }

        return (
            <>
                <p>Temp: {weather.temp}ºF</p>
                <p className='condition'>Condition: {weather.condition}</p>
                <p>Icon: {weather.icon}</p>
                <p>Visibility: {weather.visibility}</p>
            </>
        )
    }

export default Current;