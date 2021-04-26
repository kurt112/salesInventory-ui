import axios from 'axios'
import {serverEndpoint} from '../ServerEndPoint'

export const baseUrl = axios.create({
    headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
    },
    baseURL: serverEndpoint
})


export const baseUrlNoAuth = axios.create({

    baseURL: serverEndpoint
})
