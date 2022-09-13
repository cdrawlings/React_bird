import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {reset} from "../features/bird/birdSlice";
import Modal from "react-modal"
import {addSpotted, getWatch} from "../features/session/sessionSlice";
import Spinner from "../components/Spinner"

const customStyles = {
    content: {
        width: '80vw',
        top: '50%',
        left: '50%',
        right: "auto",
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root');

function Watching() {

    const {user} = useSelector((state) => state.auth)

    // watch gets the session info
    const {watch, isLoading, isSuccess, isError, message} = useSelector((state) => state.session)

    // gets the users list of spotted birds
    const {birds} = useSelector((state) => state.bird)

    // keeps track off the count in the modal
    const [count, setCount] = useState(1)

    // open closes Modal
    const [modalIsOpen, setModalIsOpen] = useState(false)

    // Holds the data for a just spotted bird
    const [spotted, setSpotted] = useState('')

    console.log('Watch:', watch)
    console.log('Birds:', birds)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
    })

    useEffect(() => {
        dispatch(getWatch())
    }, [dispatch])

    if (isLoading) {
        return <Spinner/>
    }


    // Add one to count
    const addOne = (e) => {
        // Counter state is incremented
        setCount(count + 1);
    }

    // Minus one to count
    const minusOne = (e) => {
        // Counter state is incremented
        setCount(c => Math.max(c - 1, 0));
    }

    const seenSub = (e) => {
    }

    const seenAdd = (e) => {
    }

    const addSeen = (e) => {
        console.log("Start addSeen")
        let newBird = {
            id: watch._id,
            comName: spotted.comName,
            speciesCode: spotted.speciesCode,
            birdid: spotted._id,
            count: count,
            user: user.id
        }

        console.log("Adding new count:")

        setSpotted(newBird)
        console.log("tabulated")
        dispatch(addSpotted(spotted))
        console.log("Dispatched")
        console.log("New Bird", newBird)
        console.log("Modal:", spotted)
    }

    // Open/close Modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const onChange = (e) => {
        /*
                 setFormData((prevState) => ({
                     ...prevState,
                     [e.target.id]: e.target.value,
                 }))
         */
    }

    /*
        let getCount = {
            id: watch._id,
            comName: spotted.comName,
            speciesCode: spotted.speciesCode,
            birdid: spotted._id,
            count,
        }

        function combined(){
        //    let results = birds.filter(({bird: {speciesCode: id1}}) => !seen.some(({count: {speciesCode: id2}}) => id2 === id1));
        }
    */

    return (
        <>
        <div className="main-add">

            <section className="content">

                Now watching

                {watch && (
                    <div>
                        <p id='watch-id'>Session ID: {watch._id}</p>
                        <p>Session created ID: {watch.createdAt}</p>
                        <p>Lat: {watch.lat}</p>
                        <p>Lon: {watch.lon}</p>
                        <p>City: {watch.city}</p>
                    </div>
                )}

                <div className="">
                    Seen
                    <ul id='seenlist' className='content'>
                        {watch.count.map((item) => {
                            return (
                                <li className='spotted-item' key={item.comName}>
                                    <p className='spotted_name'>{item.comName}</p>
                                    <p className='hidden'>{item.speciesCode}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="">
                    <p className='add-text'>Birds you have seen before.</p>

                    <ul id='seenlist' className='content'>
                        {birds.map((bird) => {
                            return (
                                <li className='spotted-item' key={bird.comName}>

                                    <p className='spotted_name'>{bird.comName}</p>
                                    <p className='hidden'>{bird.speciesCode}</p>

                                    <div className="counter_elements">
                                        <button onClick={() => {
                                            setSpotted(bird);
                                            setModalIsOpen(true);
                                        }} className='add_button'>+
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </section>

            <Modal isOpen={modalIsOpen} onRequestVlose={closeModal} style={customStyles}
                   contentLabel='Spotted'>

                <div className="modal-header">
                    <button className='btn-close' onClick={closeModal}>X</button>
                </div>

                <div className="modal-body">

                    {spotted.comName}

                    <div className="count-elem">
                        <button className="minus_button" onClick={minusOne}>-</button>
                        <input className="count_elem" placeholder={count} name={count}/>
                        <input className='form-control' type="text" name="count" id="count"
                               onChange={onChange} placeholder="Email" value={count} required/>
                        <button className=" add_button" onClick={addOne}>+</button>
                    </div>

                    <div className="modal-footer">
                        <button className="" onClick={addSeen}>Accept</button>
                    </div>

                </div>

            </Modal>
            </div>
        </>
    );
}


export default Watching;