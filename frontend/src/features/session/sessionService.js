import axios from 'axios'

const API_URL = '/api/bird/'

// This adds a single bird to the session DB
//api/bird/new_bird
const AddSession = async (addData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "new_bird", addData, config)

    return response.data
}

// This saves the weather/location to the session DB as a prelude to tracking birds
// api/bird/start
const StartWatch = async (addData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "start", addData, config)

    return response.data
}


// Get all birds seen by users
const getWatch = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'watch', config)

    return response.data
}


// This adds the bird spotted and updates the number of birds seen
// api/bird/start
const addSpotted = async (addData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + "watch", addData, config)

    return response.data
}


const sessionService = {
    AddSession,
    StartWatch,
    getWatch,
    addSpotted
}

export default sessionService