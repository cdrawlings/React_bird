import React from 'react';
// import {Link} from 'react-router-dom'
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


let myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", "vsqqs32292mi");
let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

let lat = 33.8840
let lon = -84.5144

function WatchBird() {
    const [birds, setBirds] = useState([])
    const [filteredBirds, setFilteredBirds] = useState(birds)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBirds()
    }, [])

    const fetchBirds = async () => {
        const response = await fetch(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lon}`, requestOptions)

        let data = await response.json()

        data.sort((a, b) => a.comName.localeCompare(b.comName))

        setBirds(data)
        setFilteredBirds(data)

        setLoading(false)
    }

    const filter = (e) => {
        let birdList = document.getElementById('birdlist')

        let value = e.target.value.toLowerCase();
        birdList.style.display = 'block'


        let result = [];
        result = birds.filter((bird) => {
            return bird.comName.toLowerCase().search(value) !== -1;
        });
        setFilteredBirds(result);
    }

    function reloadComponent(){
        window.location.reload(false);
    }

    const fillList = () => {

        let birdList = document.getElementById('birdlist')

        birdList.style.display = 'block'

        }

    if (!loading) {
        return (
            <>


                <div className="searchcontainer">

                    <p className="">Add a new bird to your birds spotted list</p>
                    <p className="">Birds seen in ###PLACE### during the last 30 days</p>

                    <div className="searchbox">

                        <input
                            type="text"
                            id="filter"
                            name="filter"
                            className="form-control search-bar"
                            onChange={(e) => filter(e)}
                            placeholder='Search birds'
                        />

                        <div className="search-adds">
                            <button className="full-list" onClick={fillList}>Full List</button>
                            <button className="reset" onClick={reloadComponent} >Reset</button>
                        </div>

                        <div id='birdlist'>
                            {filteredBirds.map((bird) => {
                                return (
                                    <div className='bird-item' key={bird.comName}>

                                        <p>{bird.comName} <span className="bird-code">{bird.speciesCode}</span> </p>

                                        <div className="bird-input">
                                            <div className="bird-box">0</div>
                                            <div className="bird-box"><FontAwesomeIcon icon={faPlus} /></div>
                                            <div className="bird-box"><FontAwesomeIcon icon={faMinus} /></div>
                                       </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                </div>
            </>
        )
    } else {
        return <h3>Loading...</h3>
    }
}

export default WatchBird