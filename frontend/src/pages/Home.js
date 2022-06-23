import React from 'react';
import {useState} from "react";
import {toast} from "react-toastify";

import WatchBird from '../components/WatchBird'
import Current from "../components/Current";


function Home() {
    return (
        <>
            <h1>Home</h1>
            <section>
                <Current />
            </section>
            <section>
                Start watching
            </section>
            <section>
               <WatchBird />
            </section>
            <section>
               last session
                chART

            </section>
        </>
    );
}

export default Home;