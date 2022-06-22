import {Link} from 'react-router-dom'
import {useEffect, useState} from "react";

let myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", "vsqqs32292mi");
let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

let lat=33.8840
let lon=-84.5144

function BirdResults() {
    const [birds, setBirds] = useState([])
    const [filteredBirds, setFilteredBirds] = useState(birds)
    const [loading, setLoading] = useState(true)

    console.log("birds:", birds)
    console.log("Filtered birds:", filteredBirds)

    useEffect(() => {
            fetchBirds()
        }, [])

    const fetchBirds = async () => {
        const response =  await fetch(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lon}`, requestOptions)

        const data = await response.json()

        setBirds(data)
        setFilteredBirds(data)

        setLoading(false)
    }

    const filter = (e) => {
let birdList = document.getElementById('birdlist')

        let value = e.target.value.toLowerCase();
birdList.style.display = 'block'


        let result = [];
        console.log(value);
        result = birds.filter((bird) => {
            return bird.comName.toLowerCase().search(value) != -1;
        });
        setFilteredBirds(result);
    }

    if(!loading) {
    return(
        <>
            <div className="searchcontainer">

                <p className="">Add a new bird to your birds spotted list</p>
                <p className="">Birds seen in ###PLACE### during the last 30 days</p>

                <p className="">Search</p>

                <div className="searchbox">

                    <input
                        type="text"
                        id="filter"
                        name="filter"
                        className="form-control"
                        onChange={(e) => filter(e)}
                    />

                    <div id='birdlist'>
                            {filteredBirds.map((bird) => {
                                return (
                                    <div key={bird.comName}><p>{bird.comName} / {bird.speciesCode}</p>
                                    </div>
                            )
                            })}


                        </div>
                </div>
        </div>











            <div className="">Birds spotted</div>

        </>
    )
} else {
        return <h3>Loading...</h3>
    }
}

export default BirdResults