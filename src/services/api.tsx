import axios from 'axios';

// let url_api = "http://localhost:3000/";
let url_api = "https://pwmoviepoject-production.up.railway.app/";

const api = axios.create({
    baseURL: url_api,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;