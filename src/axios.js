import axios from 'axios';

const uri = 'https://matched-perl-cons-operates.trycloudflare.com/'

// myAxios.js
const instance = axios.create({
    baseURL: uri,
    headers: {
        common: {
            "Bypass-Tunnel-Reminder": 'true'
        }
    }
});

export default instance;