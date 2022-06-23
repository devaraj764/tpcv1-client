import axios from 'axios';

// myAxios.js
const instance = axios.create({
    baseURL: 'https://tpc-api.loca.lt',
    headers: {
        common: {
            "Bypass-Tunnel-Reminder": 'true'
        }
    }
});

export default instance;