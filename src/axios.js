import axios from 'axios';

export const uri = 'https://dispatched-darkness-mpegs-received.trycloudflare.com'
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