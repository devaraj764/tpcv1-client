import axios from 'axios';

export const uri = 'https://authors-parameter-advancement-fresh.trycloudflare.com'
// export const uri = 'http://localhost'

// myAxios.js
const instance = axios.create({
    baseURL: uri,
    headers: {
        common: {
            "Bypass-Tunnel-Reminder": 'true',
            "auth-token": localStorage.getItem('admin-token')
        }
    }
});

export default instance;