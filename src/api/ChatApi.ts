import axios from "axios";


export const ChatApi = axios.create({
    baseURL:'http://192.168.1.34:8000/api',
    headers:{ 'Content-Type': 'application/json'}
})

ChatApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token':localStorage.getItem('token')
    }

    return config;
})