import axios from "axios"

export const instance = axios.create({
    baseURL: '/getVillage',
    timeout: 60000,
    headers: {'Access-Control-Allow-Origin': '*'}
})