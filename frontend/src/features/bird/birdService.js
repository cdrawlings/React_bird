import axios from 'axios'

const API_URL = '/api/bird/'

const addBird = async (addData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, addData, config)

    return response.data
}


// Get all birds seen by users
const getBirds = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}


// Get Last bird seen by users
const getLast = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log('hello')
    const response = await axios.get(API_URL + "new_bird", config)

    return response.data

}


const birdService = {
    addBird,
    getBirds,
    getLast,
}

export default birdService