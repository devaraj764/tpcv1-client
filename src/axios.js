import axios from 'axios';

<<<<<<< HEAD
export const uri = 'https://gadgets-lazy-girl-cedar.trycloudflare.com'
// export const uri = 'http://localhost'
=======
// export const uri = 'https://dispatched-darkness-mpegs-received.trycloudflare.com'
export const uri = 'http://localhost'
>>>>>>> abb43cfdf16863c506f4b701e1a4c8e02ddc8e9f

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