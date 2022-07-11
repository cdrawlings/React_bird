import React from 'react';
import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {getLast, reset} from "../features/bird/birdSlice";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
// import Spinner from "../components/Spinner";



function NewBird() {
    const {last, isLoading, isSuccess} = useSelector((state) => state.bird )

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch,isSuccess])

    useEffect(() => {
        dispatch(getLast())
    }, [dispatch])

    if (isLoading){
        return <Spinner />
    }

    console.log("Are we here?", last, last.comName)

    return (

        <>

            <section>
                <div>

                    <p> Add the bird to your list of spotted birds</p>


                    <p>  user: </p>
                    <p>  timestamp</p>

                    <p>   Bird Name: {last.comName}</p>
                    <p>   species code:{last.speciesCode}</p>:
                   <p>BIRD ID: {last._id}</p>
                    <p>USER ID: {last.user}</p>
                    <p>   quantity of bird seen</p>
                    <p>   user bird id:</p>

                    Submit
                </div>
            </section>


        </>
    );
}

export default NewBird;