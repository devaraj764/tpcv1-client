import axios from 'axios';

const uri = 'https://changes-territories-lined-sisters.trycloudflare.com'

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