import axios from 'axios';

const API_URL = 'http://localhost:8090/api/v1/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                name: user.name,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
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