import axios from 'axios'
import {serverEndpoint} from '../ServerEndPoint'

let token = localStorage.getItem('jars-token')


 const baseUrlWithAuth = axios.create({
    headers: {
        Authorization: "Bearer " + token
    },
    baseURL: serverEndpoint
})

export default baseUrlWithAuth


