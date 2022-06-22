import React from 'react';
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Spinner from '../components/Spinner'
import BirdResults from "../components/BirdResults"

const lat = '33.89'
const lon = '-84.51'

function FindBird() {
    const [birds, setBirds] = useState(null)

    const navigate = useNavigate();

    let config = {
        method: 'get',
        url: `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lon}`,
        headers: {
            'X-eBirdApiToken': 'vsqqs32292mi'
        }
    };

   // const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(async () => {
        await axios(config)
            .then(function (response) {
                setBirds(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
}, [birds])


    useEffect( async () => {


    })

    console.log('Bird API:', birds)

    /*
    if (isLoading) {
        return <Spinner />
    }
    */

    //
    if (!birds) return "No post!"

    return (
        <>
            <h1 className='title'>FindBirds</h1>


            <div className="search-box">

                <input type="text" id="filterBird" className="form-control search-bar"
                       placeholder="Bird Name" />

                    <div className="search__full">
                        <button className="" id="full-list">Full List</button>
                        <a href="/birds/add_birds" className="" id="reset">Reset</a>
                    </div>

                <br />


            <div id="bird-list">
                <ul>

                </ul>
            </div>

</div>

                {
                    birds.map((bird) =>  <BirdResults key={bird.speciesCode} bird={bird} /> )
                }

        </>
    );
}

export default FindBird;
