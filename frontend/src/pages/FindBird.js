import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify'
import {addBird, reset} from "../features/bird/birdSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner";


// Goes to Add bird

function FindBird() {
    let myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", "vsqqs32292mi");
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const [ebird, setEbird] = useState([])
    const [filtered, setFiltered] = useState([])
    const [newbird, setNewBird] = useState({
        comName: '',
        speciesCode: '',
    })

    const {location} = useSelector((state) => state.current)
    const  { isLoading, isError, isSuccess, message } = useSelector((state) => state.bird)

    const lat = location.lat
    const lon = location.lon

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Get the list of birds on load
    useEffect(() => {
         fetchBirds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess) {
            dispatch(reset())
            navigate('/new_bird')
        }
        dispatch(reset())
    }, [dispatch, isSuccess, isError, message, navigate])

    if(isLoading){
        return <Spinner />
    }

    // Get a list of birds in the area from eBirds.org
    const fetchBirds = async () => {
        const response = await fetch(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lon}`, requestOptions)

        let data = await response.json()

       data.sort((a, b) => a.comName.localeCompare(b.comName))

       setEbird(data)
    }

    // Filter the bird by input
    const filter = (e) => {
        let birdList = document.getElementById('birdlist')

        let value = e.target.value.toLowerCase();
        birdList.style.display = 'block'

        let result = [];
        result = ebird.filter((bird) => {
            return bird.comName.toLowerCase().search(value) !== -1;
        });
        setFiltered(result);
    }

    // Show the full list of birds
    const fillList = () => {
        let birdList = document.getElementById('birdlist')
        birdList.style.display = 'block'

        setFiltered(ebird)
    }

    // Reset the search bar
    function reloadComponent(){
        let filter = document.getElementById('filter')
        let birdList = document.getElementById('birdlist')
        let resetBird = []
        setFiltered(resetBird);

        filter.value = '';
        birdList.style.display = 'none'
    }

    // Add the spotted bird to the database
    const getId = (e) => {
        let comName = e.currentTarget.previousElementSibling.previousElementSibling.innerText;
        let speciesCode = e.currentTarget.previousElementSibling.innerText;

        const spotted = {
            comName,
            speciesCode,
        }
        dispatch(addBird(spotted))
    }

console.log(newbird)

    return (
        <>
            <div className="main-add">

                <section className="content">

                    <h1 className='title'>Add a bird </h1>
                    <p className='add-text'>See a new bird? quickly add it to your viewed birds list.</p>

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
                </section>

                <section>
                    <div className="searchcontainer">
                        <div className="searchbox ">

                            <ul id='birdlist' className='content'>
                                {filtered.map((bird) => {
                                    return (

                                        <li  className='bird-item' key={bird.comName}>

                                            <p >{bird.comName}</p>
                                            <p >{bird.speciesCode}</p>
                                            <button id={bird.speciesCode} onClick={getId} className="bird-box"><FontAwesomeIcon icon={faPlus} /></button>

                                        </li>

                                    )

                                })}
                            </ul>

                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default FindBird;