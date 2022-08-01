import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";


function Watching() {
    const {session, isLoading, isSuccuss, isError, message} = useSelector((state) => state.session)

    const params = useParams();

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
    })


    return (
        <div>
            <div className="main-add">
                <section className="content">
                    Now watching
                    <div className="">
                        Seen
                    </div>
                    <div className="">
                        <p className='add-text'>Birds you have seen before.</p>


                    </div>


                </section>
            </div>

        </div>
    );
}

export default Watching;