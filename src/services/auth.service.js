import {webClientInstance} from "./axios-create";

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
        return webClientInstance.post('/users', {
            name: user.name,
            password: user.password
        });
    }
}

export default new AuthService();
