import axios from 'axios';

// myAxios.js
const instance = axios.create({
    baseURL: 'http://localhost:80',
    headers: {
        common: {
            "Bypass-Tunnel-Reminder": 'true',
            "auth-token": localStorage.getItem('admin-token')
        }
    }
});

export default instance;