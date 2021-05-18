import axios from 'axios';

const API_URL = `http://localhost:8090/api/v1/`;

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

class BookService {
    createBook(book) {
        let user = JSON.parse(localStorage.getItem('user'));
        let user_id = parseJwt(user.token);
        user_id = user_id._id;
        console.log(user_id)

        return axios
            .post(API_URL + `${user_id}/books`, {
                name: book.name,
                // _token: csrfToken
            });
    }

    getAllBookByUser(book) {
        let user = localStorage.getItem('user');
        let user_id = parseJwt(user.token);

        return axios
            .get(API_URL + `${user_id}/books`, {
                name: book.name
            });
    }

    register(user) {
        return axios.post(API_URL + 'users', {
            name: user.name,
            password: user.password
        });
    }
}

export default new BookService();