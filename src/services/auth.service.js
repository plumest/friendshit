import axios from 'axios';
import {webClientInstance} from "./axios-create";

const API_URL = process.env.VUE_APP_API_URL;

class AuthService {
    login(user) {
        return webClientInstance
            .post('/login', {
                name: user.name,
                password: user.password
            }, {
                withCredentials: true
            })
            .then(response => {
                const data = {token: response.data.token, ...response.data.result}
                if (data.token) {
                    localStorage.setItem('user', JSON.stringify(data));
                }
                return data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'users', {
            name: user.name,
            password: user.password
        });
    }
}

export default new AuthService();
