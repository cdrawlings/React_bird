import React from 'react';
import {useSelector} from "react-redux";

function SeenBirds() {
    const {birds} = useSelector((state) => state.bird)

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