
import axios from './axios'

const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
}

export const register = (data) => axios.post('/register', data, config);

export const login = (data) =>  axios.post('/login', data, config);

export const sendEmail = (data) => axios.post('/reset', data, config);


export const resetPassword = (data, userId, token) => axios.post(`/reset-password/${userId}/${token}`, data, config);