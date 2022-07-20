import React from 'react';
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getBirds, reset} from "../features/bird/birdSlice";
import Spinner from "../components/Spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

// Goes to bird ID page for info on seen bird

function SeenBirds() {
    const {birds, isLoading, isSuccess} = useSelector((state) => state.bird )
    const {location} = useSelector((state) => state.current)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch,isSuccess])

    useEffect(() => {
        dispatch(getBirds())
    }, [dispatch])

    if (isLoading){
        return <Spinner />
    }

    console.log("Super location", location)

    return (
        <>
            <div className="main-add">
                <section className="content">
                    <h1 className='title'>Birds seen</h1>
                    <p className='add-text'>Birds you have seen before.</p>

                    <ul id='seenlist' className='content'>
                        {birds.map((bird) => {
                            return (

                                <li  className='bird-item' key={bird.comName}>

                                    <p >{bird.comName}</p>
                                    <p >{bird.speciesCode}</p>
                                </li>
                            )

                        })}
                    </ul>

                </section>
            </div>

        </>
    );
}

export default SeenBirds;