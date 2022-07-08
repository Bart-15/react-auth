import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
}   

// for public api
export default axios.create({
    baseURL: BASE_URL
});

// private and protected routes
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    config
})