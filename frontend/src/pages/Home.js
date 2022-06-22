import React from 'react';
import {useState} from "react";
import {toast} from "react-toastify";

import BirdResults from '../components/BirdResults'


function Home() {
    return (
        <>
            <h1>Home</h1>
            <section>
                Todays state
            </section>
            <section>
                Start watching
            </section>
            <section>
               <BirdResults />
            </section>
            <section>
               last session
                chART

            </section>
        </>
    );
}

export default Home;