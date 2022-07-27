import axios from 'axios'

const API_URL = '/api/bird/'


const addSession = async (addData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "new_bird", addData, config)

    return response.data
}


const sessionService = {
    addSession,
}

export default sessionService