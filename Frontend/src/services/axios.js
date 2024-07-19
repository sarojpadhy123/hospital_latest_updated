import axios from 'axios'

const api = axios.create({
  //Backend Url
    baseURL: 'http://localhost:3200',
    timeout: 1000
})

api.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    if(token){
        config.headers['x-auth-token'] = token
    }
    return config
})

export default api;