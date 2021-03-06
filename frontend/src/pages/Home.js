import React from 'react';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLocation} from "../features/current/currentSlice";
// import Weather from "../components/Weather"
import { Link } from 'react-router-dom'

function Home() {
    const {location} = useSelector((state) => state.current)

    const dispatch = useDispatch();

    useEffect(() => {
        getCoords()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCoords = async () => {
        navigator.geolocation.getCurrentPosition(async position => {
            const locApi = "AIzaSyAF2o2lBWk9H8JQhpwvI_U9e5rFZUikQY4";

            const lat = position.coords.latitude
            const lon = position.coords.longitude

            // Get current information
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${locApi}`
            )

            let data = await response.json()
            let city = data.results[0].address_components[3].long_name
            const apiKey = 'c2badbed053fc07c15b017c4906fade6';

            /*
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely,alerts&appid=${apiKey}&units=imperial`)

            const responseData = await weatherResponse.json()

            console.log(responseData);
            const temp = responseData.current.temp;
            const condition = responseData.current.weather[0].description;
            const icon = responseData.current.weather[0].icon;
            const visibility = responseData.current.visibility;


             */
            const placeData = {
                lat, lon, city,  // temp, condition, icon,  visibility
            }

            dispatch(addLocation(placeData))
        })
    }

    console.log("location", location)



    return (
        <>
            <div className="main">

                <h1>Home</h1>
                <div className="dashboard">

                    <div className="card-dash current">
                        <p>Lat: {location.lat} </p>
                        <p> Lon: {location.lon} </p>
                        <p> City: {location.city} </p>



                    </div>

                    <div className="card-dash start">
                        <h3>START BIRD WATCHING</h3>
                        <p>Keep track of all the birds you see this session</p>
                        <Link to='add_bird' className='btn btn-dash'>BIRD WATCH</Link>
                    </div>

                    <div className="card-dash seen-bird">
                        <h3>MY BIRDS</h3>
                        <p>Keep track of all the birds you see this session.</p>
                        <Link to='birds' className='btn btn-dash'>VIEW</Link>
                    </div>

                    <div className="card-dash new-bird">
                        <h3>ADD A BIRD</h3>
                        <p>Did you just spot a bird you have never seen brfore? Add it to your list of spotted
                            birds!
                        </p>
                        <Link to='find_bird' className='btn btn-dash'>ADD</Link>
                    </div>

                    <div className="card-chart dash-chart">
                        Chart
                    </div>

                </div>
            </div>

        </>
    );
}

export default Home;