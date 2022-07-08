import axios from './axios';

const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
}

export const getStudents = (signal) => axios.get('/students', {signal:signal}, config);