import Axios from "axios";

const API_PATH = process.env.VUE_APP_API_URL;

const webClientInstance = Axios.create({
    baseURL: API_PATH,
    withCredentials: true
});
const clientInstance = Axios.create({
    baseURL: API_PATH,
    withCredentials: true
});

webClientInstance.interceptors.request.use(async (config) => {
    let user = localStorage.getItem('user');
    if (user) {
        const { token } = JSON.parse(user);
        config.headers['Authorization'] = `Bearer ${token}`
    }
    let { data } = await clientInstance.get('/config');
    config.headers['x-csrf-token'] = data.csrfToken;
    return config;
});

export {
    webClientInstance
}



