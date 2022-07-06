import axios from 'axios';

export const uri = 'https://they-recreation-initiative-reduction.trycloudflare.com'
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